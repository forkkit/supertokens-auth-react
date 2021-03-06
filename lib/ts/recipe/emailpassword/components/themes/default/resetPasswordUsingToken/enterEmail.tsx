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
import React, { PureComponent, Fragment } from "react";
import StyleContext from "../../../styles/styleContext";

import { EnterEmailThemeProps, EnterEmailThemeState } from "../../../../types";
import { CSSObject } from "@emotion/serialize/types";

/** @jsx jsx */
import { jsx } from "@emotion/core";
import FormBase from "../../../library/FormBase";
import { Styles } from "../../../../../../types";
import { NormalisedPalette } from "../types";

/*
 * Styles.
 */
function getStyles(palette: NormalisedPalette): Styles {
    return {
        headerTitle: {
            fontSize: palette.fonts.size[2],
            lineHeight: "40px",
            letterSpacing: "0.58px",
            fontWeight: 600,
            color: palette.colors.textTitle
        } as CSSObject,

        headerSubTitle: {
            marginTop: "9px",
            marginBottom: "21px"
        } as CSSObject,

        successMessage: {
            marginBottom: "15px"
        } as CSSObject
    };
}

/*
 * Component.
 */

export default class EnterEmailTheme extends PureComponent<EnterEmailThemeProps, EnterEmailThemeState> {
    static contextType = StyleContext;
    /*
     * Constructor.
     */
    constructor(props: EnterEmailThemeProps) {
        super(props);
        this.state = {
            emailSent: false
        };
    }

    /*
     * Methods.
     */

    onSuccess = (): void => {
        this.setState(() => ({
            emailSent: true
        }));
        if (this.props.onSuccess !== undefined) {
            this.props.onSuccess();
        }
    };

    resend = (): void => {
        this.setState(() => ({
            emailSent: false
        }));
    };

    /*
     * Render.
     */
    render(): JSX.Element {
        const styles = this.context;
        const componentStyles = getStyles(styles.palette);
        const { formFields, callAPI } = this.props;
        const { emailSent } = this.state;

        // If email sent, show success UI.
        if (emailSent === true) {
            return (
                <div className="container" css={styles.container}>
                    <div className="row" css={styles.row}>
                        <div
                            className="primaryText successMessage"
                            css={[styles.primaryText, componentStyles.successMessage, styles.successMessage]}>
                            Please check your email for the password recovery link.{" "}
                            <span className="link" css={styles.link} onClick={this.resend}>
                                Resend
                            </span>
                        </div>
                    </div>
                </div>
            );
        }

        // Otherwise, return Form.
        return (
            <FormBase
                formFields={formFields}
                buttonLabel={"Email me"}
                onSuccess={this.onSuccess}
                callAPI={callAPI}
                showLabels={false}
                validateOnBlur={true}
                header={
                    <Fragment>
                        <div className="headerTitle" css={[componentStyles.headerTitle, styles.headerTitle]}>
                            Reset your password
                        </div>
                        <div className="headerSubtitle" css={[componentStyles.headerSubTitle, styles.headerSubtitle]}>
                            <div className="secondaryText" css={styles.secondaryText}>
                                We will send you an email to reset your password
                            </div>
                        </div>
                    </Fragment>
                }
            />
        );
    }
}
