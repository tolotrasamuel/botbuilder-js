/**
 * @module botbuilder-ai
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * NOTE: This class was auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * and was manually modified to make it compliant with the current implementation of the library.
 */

export interface Sentiment {
    /**
    * The polarity of the sentiment, can be positive, neutral or negative.
    */
    label: String;
    /**
    * Score of the sentiment, ranges from 0 (most negative) to 1 (most positive).
    */
    score: number;
}

export class Sentiment {
    /**
    * The polarity of the sentiment, can be positive, neutral or negative.
    */
     'label': String;
    /**
    * Score of the sentiment, ranges from 0 (most negative) to 1 (most positive).
    */
    'score': number;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            'name': 'label',
            'baseName': 'label',
            'type': 'string'
        },
        {
            'name': 'score',
            'baseName': 'score',
            'type': 'number'
        }    ];

    static getAttributeTypeMap() {
        return Sentiment.attributeTypeMap;
    }
}
