/**
 * @module botframework-streaming-extensions
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import { ITransport } from './iTransport';

export interface ITransportReceiver extends ITransport {
    receive(count: number): Promise<Buffer>;
}
