/**
 * @module botframework-streaming-extensions
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import { IHeader } from '../interfaces/iHeader';
import { PayloadTypes } from '../payloads/payloadTypes';
import { PayloadSender } from '../payloadtransport/payloadSender';

export class CancelDisassembler {
    private readonly sender: PayloadSender;
    private readonly id: string;
    private readonly payloadType: PayloadTypes;

    public constructor(sender: PayloadSender, id: string, payloadType: PayloadTypes) {
        this.sender = sender;
        this.id = id;
        this.payloadType = payloadType;
    }

    public disassemble(): void {
        const header: IHeader = {payloadType: this.payloadType, payloadLength: 0, id: this.id, end: true};
        this.sender.sendPayload(header, undefined, undefined);
    }
}
