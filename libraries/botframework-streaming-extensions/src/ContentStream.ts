/**
 * @module botframework-streaming-extensions
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import { SubscribableStream } from './subscribableStream';
import { PayloadAssembler } from './assemblers';

export class ContentStream {
    public id: string;
    private readonly assembler: PayloadAssembler;
    private stream: SubscribableStream;

    public constructor(id: string, assembler: PayloadAssembler) {
        if (assembler === undefined) {
            throw Error('Null Argument Exception');
        }
        this.id = id;
        this.assembler = assembler;
    }

    public get contentType(): string {
        return this.assembler.payloadType;
    }

    public get length(): number {
        return this.assembler.contentLength;
    }

    public getStream(): SubscribableStream {
        if (this.stream === undefined) {
            this.stream = this.assembler.getPayloadStream();
        }

        return this.stream;
    }

    public cancel(): void {
        this.assembler.close();
    }

    public async readAsString(): Promise<string> {
        let record = await this.readAll();
        let allData = record.bufferArray;
        let stringResult = '';
        for (let i = 0; i < allData.length; i++) {
            stringResult += allData[i].toString('utf8');
        }

        return stringResult;
    }

    public async readAsJson<T>(): Promise<T> {
        let stringToParse = await this.readAsString();
        try {
            return <T>JSON.parse(stringToParse);
        } catch (error) {
            throw error;
        }
    }

    private async readAll(): Promise<Record<string, any>> {
    // do a read-all
        let allData: Buffer[] = [];
        let count = 0;
        let stream = this.getStream();

        // populate the array with any existing buffers
        while (count < stream.length) {
            let chunk = stream.read(stream.length);
            allData.push(chunk);
            count += (chunk as Buffer).length;
        }

        if (count < this.length) {
            let readToEnd = new Promise<boolean>((resolve): void => {
                let callback = (cs: ContentStream) => (chunk: any): void => {
                    allData.push(chunk);
                    count += (chunk as Buffer).length;
                    if (count === cs.length) {
                        resolve(true);
                    }
                };

                stream.subscribe(callback(this));
            });

            await readToEnd;
        }

        return {bufferArray: allData, size: count};
    }

}
