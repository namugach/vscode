/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Codicon } from 'vs/base/common/codicons';
import { ServicesAccessor } from 'vs/editor/browser/editorExtensions';
import { localize } from 'vs/nls';
import { Action2, MenuId, registerAction2 } from 'vs/platform/actions/common/actions';
import { INTERACTIVE_SESSION_CATEGORY } from 'vs/workbench/contrib/interactiveSession/browser/actions/interactiveSessionActions';
import { IInteractiveSessionService, IInteractiveSessionUserActionEvent, InteractiveSessionVoteDirection } from 'vs/workbench/contrib/interactiveSession/common/interactiveSessionService';
import { isResponseVM } from 'vs/workbench/contrib/interactiveSession/common/interactiveSessionViewModel';

export function registerInteractiveSessionTitleActions() {
	registerAction2(class VoteUpAction extends Action2 {
		constructor() {
			super({
				id: 'workbench.action.interactiveSession.voteUp',
				title: {
					value: localize('interactive.voteUp.label', "Vote Up"),
					original: 'Vote Up'
				},
				f1: false,
				category: INTERACTIVE_SESSION_CATEGORY,
				icon: Codicon.thumbsup,
				menu: {
					id: MenuId.InteractiveSessionTitle,
					// when: interactiveSessionResponseHasProviderId, // re-add when the provider id has been adopted
					group: 'navigation',
				}
			});
		}

		run(accessor: ServicesAccessor, ...args: any[]) {
			const item = args[0];
			if (!isResponseVM(item)) {
				return;
			}

			const interactiveSessionService = accessor.get(IInteractiveSessionService);
			interactiveSessionService.notifyUserAction(<IInteractiveSessionUserActionEvent>{
				providerId: item.providerId,
				action: {
					kind: 'vote',
					direction: InteractiveSessionVoteDirection.Up,
					responseId: item.providerResponseId
				}
			});
		}
	});

	registerAction2(class VoteDownAction extends Action2 {
		constructor() {
			super({
				id: 'workbench.action.interactiveSession.voteDown',
				title: {
					value: localize('interactive.voteDown.label', "Vote Down"),
					original: 'Vote Down'
				},
				f1: false,
				category: INTERACTIVE_SESSION_CATEGORY,
				icon: Codicon.thumbsdown,
				menu: {
					id: MenuId.InteractiveSessionTitle,
					// when: interactiveSessionResponseHasProviderId, // re-add when the provider id has been adopted
					group: 'navigation',
				}
			});
		}

		run(accessor: ServicesAccessor, ...args: any[]) {
			const item = args[0];
			if (!isResponseVM(item)) {
				return;
			}

			const interactiveSessionService = accessor.get(IInteractiveSessionService);
			interactiveSessionService.notifyUserAction(<IInteractiveSessionUserActionEvent>{
				providerId: item.providerId,
				action: {
					kind: 'vote',
					direction: InteractiveSessionVoteDirection.Down,
					responseId: item.providerResponseId
				}
			});
		}
	});
}
