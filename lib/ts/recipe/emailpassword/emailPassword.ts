/* Copyright (c) 2020, VRAI Labs and/or its affiliates. All rights reserved.
 *
 * This software is licensed under the Apache License, Version 2.0 (the
 * "License") as published by the Apache Software Foundation.
 *
 * You may not use this file except in compliance with the License. You may
 * obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 */

/*
 * Imports.
 */
import sessionSdk from "supertokens-website/lib/build/fetch";

import RecipeModule from "../recipeModule";
import {
    CreateRecipeFunction,
    RouteToFeatureComponentMap,
    RequestJson,
    NormalisedAppInfo,
    APIFormField
} from "../../types";
import {
    EmailPasswordConfig,
    EmailPasswordUserInput,
    EnterEmailAPIResponse,
    FormFieldError,
    NormalisedEmailPasswordConfig,
    SignInAPIResponse,
    SignOutAPIResponse,
    SignUpAPIResponse,
    SubmitNewPasswordAPIResponse,
    VerifyEmailAPIResponse
} from "./types";
import { isTest, validateForm } from "../../utils";
import HttpRequest from "../../httpRequest";
import { normaliseEmailPasswordConfig } from "./utils";
import { ResetPasswordUsingToken, SignInAndUp } from ".";
import NormalisedURLPath from "../../normalisedURLPath";
import { API_RESPONSE_STATUS, DEFAULT_RESET_PASSWORD_PATH } from "./constants";
import { SOMETHING_WENT_WRONG_ERROR, SSR_ERROR } from "../../constants";

/*
 * Class.
 */
export default class EmailPassword extends RecipeModule {
    /*
     * Static Attributes.
     */
    static instance?: EmailPassword;
    static RECIPE_ID = "emailpassword";

    /*
     * Instance Attributes.
     */
    private config: NormalisedEmailPasswordConfig;

    private httpRequest: HttpRequest;

    /*
     * Constructor.
     */
    constructor(config: EmailPasswordConfig) {
        super(config);
        this.config = normaliseEmailPasswordConfig(config);
        this.httpRequest = new HttpRequest(config.appInfo);
    }

    /*
     * Instance methods.
     */

    getConfig = (): NormalisedEmailPasswordConfig => {
        return this.config;
    };

    getFeatures = (): RouteToFeatureComponentMap => {
        const features: RouteToFeatureComponentMap = {};
        if (this.config.signInAndUpFeature.disableDefaultImplementation !== true) {
            const normalisedFullPath = this.getAppInfo().websiteBasePath.appendPath(new NormalisedURLPath("/"));
            features[normalisedFullPath.getAsStringDangerous()] = SignInAndUp;
        }

        if (this.config.resetPasswordUsingTokenFeature.disableDefaultImplementation !== true) {
            const normalisedFullPath = this.getAppInfo().websiteBasePath.appendPath(
                new NormalisedURLPath(DEFAULT_RESET_PASSWORD_PATH)
            );
            features[normalisedFullPath.getAsStringDangerous()] = ResetPasswordUsingToken;
        }
        return features;
    };

    /*
     * API.
     */

    /*
     * SignIn/SignUp
     */

    signUpAPI = async (requestJson: RequestJson, headers: HeadersInit): Promise<SignUpAPIResponse> => {
        return this.httpRequest.post("/signup", {
            body: JSON.stringify(requestJson),
            headers: {
                ...headers,
                rid: this.getRecipeId()
            }
        });
    };

    emailExistsAPI = async (value: string, headers: HeadersInit): Promise<VerifyEmailAPIResponse> => {
        return this.httpRequest.get(
            "/signup/email/exists",
            {
                headers: {
                    ...headers,
                    rid: this.getRecipeId()
                }
            },
            {
                email: value
            }
        );
    };

    signInAPI = async (requestJson: RequestJson, headers: HeadersInit): Promise<SignInAPIResponse> => {
        return this.httpRequest.post("/signin", {
            body: JSON.stringify(requestJson),
            headers: {
                ...headers,
                rid: this.getRecipeId()
            }
        });
    };

    /*
     * Reset Password
     */

    submitNewPasswordAPI = async (
        requestJson: RequestJson,
        headers: HeadersInit
    ): Promise<SubmitNewPasswordAPIResponse> => {
        return this.httpRequest.post("/user/password/reset", {
            body: JSON.stringify(requestJson),
            headers: {
                ...headers,
                rid: this.getRecipeId()
            }
        });
    };

    enterEmailAPI = async (requestJson: RequestJson, headers: HeadersInit): Promise<EnterEmailAPIResponse> => {
        return this.httpRequest.post("/user/password/reset/token", {
            body: JSON.stringify(requestJson),
            headers: {
                ...headers,
                rid: this.getRecipeId()
            }
        });
    };

    /*
     * SignOut
     */

    signOut = async (): Promise<SignOutAPIResponse> => {
        const result = await this.httpRequest.fetch(this.httpRequest.getFullUrl("/signout"), {
            method: "POST",
            body: JSON.stringify({}),
            headers: {
                rid: this.getRecipeId()
            }
        });

        const sessionExpiredStatusCode = sessionSdk.sessionExpiredStatusCode;
        if (result.status === sessionExpiredStatusCode) {
            return {
                status: API_RESPONSE_STATUS.OK
            };
        }
        if (result.status >= 300) {
            throw Error(SOMETHING_WENT_WRONG_ERROR);
        }

        return await result.json();
    };

    /*
     * Validate
     */

    /*
     * SignIn/SignUp
     */

    async signUpValidate(input: APIFormField[]): Promise<FormFieldError[]> {
        return await validateForm(input, this.config.signInAndUpFeature.signUpForm.formFields);
    }

    async signInValidate(input: APIFormField[]): Promise<FormFieldError[]> {
        return await validateForm(input, this.config.signInAndUpFeature.signInForm.formFields);
    }

    /*
     * Reset Password
     */

    async submitNewPasswordValidate(input: APIFormField[]): Promise<FormFieldError[]> {
        return await validateForm(input, this.config.resetPasswordUsingTokenFeature.submitNewPasswordForm.formFields);
    }

    async enterEmailValidate(input: APIFormField[]): Promise<FormFieldError[]> {
        return await validateForm(input, this.config.resetPasswordUsingTokenFeature.enterEmailForm.formFields);
    }

    /*
     * Static methods.
     */

    static init(config?: EmailPasswordUserInput): CreateRecipeFunction {
        return (appInfo: NormalisedAppInfo): RecipeModule => {
            EmailPassword.instance = new EmailPassword({
                ...config,
                appInfo,
                recipeId: EmailPassword.RECIPE_ID
            });
            return EmailPassword.instance;
        };
    }

    static signOut(): Promise<SignOutAPIResponse> {
        return EmailPassword.getInstanceOrThrow().signOut();
    }

    static getInstanceOrThrow(): EmailPassword {
        if (EmailPassword.instance === undefined) {
            let error =
                "No instance of EmailPassword found. Make sure to call the EmailPassword.init method." +
                "See https://supertokens.io/docs/emailpassword/starter-guide/frontend";

            if (typeof window === "undefined") {
                error = error + SSR_ERROR;
            }
            throw Error(error);
        }

        return EmailPassword.instance;
    }

    /*
     * Tests methods.
     */
    static reset(): void {
        if (!isTest()) {
            return;
        }

        EmailPassword.instance = undefined;
        return;
    }
}
