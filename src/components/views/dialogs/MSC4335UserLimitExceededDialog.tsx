/*
Copyright 2025 New Vector Ltd.

SPDX-License-Identifier: AGPL-3.0-only OR GPL-3.0-only OR LicenseRef-Element-Commercial
Please see LICENSE files in the repository root for full details.
*/

import React from "react";

import { _t } from "../../../languageHandler";
import BaseDialog from "./BaseDialog";
import DialogButtons from "../elements/DialogButtons";
import AccessibleButton from "../elements/AccessibleButton";

interface MSC4335Data {
    infoUri: string;
    softLimit: boolean;
    increaseUri?: string;
}

interface IProps {
    onFinished?: (success?: boolean) => void;
    title?: string;
    error: MSC4335Data;
}

interface IState {
    onFinished: (success: boolean) => void;
}

export default class MSC4335UserLimitExceededDialog extends React.Component<IProps, IState> {
    onFinished = (success?: boolean): void => {
        this.props.onFinished?.(success);
    };

    onLearnMore = (): void => {
        window.open(this.props.error.infoUri, "_blank", "noreferrer");
    };

    onIncrease = (): void => {
        const uri = this.props.error.increaseUri;
        if (uri) {
            window.open(uri, "_blank", "noreferrer");
        }
    };

    public render(): React.ReactNode {
        const { softLimit } = this.props.error;
        return (
            <BaseDialog
                className="mx_ErrorDialog"
                title={this.props.title || _t("msc4335_user_limit_exceeded|title")}
                contentId="mx_Dialog_content"
                onFinished={this.onFinished}
            >
                <div className="mx_Dialog_content" id="mx_Dialog_content">
                    {softLimit
                        ? _t(
                              "msc4335_user_limit_exceeded|soft_limit",
                              {},
                              {
                                  a: (sub) => (
                                      <a href={this.props.error.infoUri} target="_blank" rel="noreferrer">
                                          {sub}
                                      </a>
                                  ),
                              },
                          )
                        : _t("msc4335_user_limit_exceeded|hard_limit")}
                </div>
                <DialogButtons
                    primaryButton={
                        softLimit
                            ? _t("msc4335_user_limit_exceeded|increase_limit")
                            : _t("msc4335_user_limit_exceeded|learn_more")
                    }
                    hasCancel={false}
                    onPrimaryButtonClick={softLimit ? this.onIncrease : this.onLearnMore}
                    focus={true}
                >
                    {softLimit && (
                        <AccessibleButton onClick={this.onLearnMore} kind="link">
                            {_t("msc4335_user_limit_exceeded|learn_more")}
                        </AccessibleButton>
                    )}
                </DialogButtons>
            </BaseDialog>
        );
    }
}
