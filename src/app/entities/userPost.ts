import { FlexibleConnectedPositionStrategyOrigin } from "@angular/cdk/overlay";

export class UserPost{
    constructor(
        public id: number | null,
        public email: string | null,
        public message: string,
        public imageURL: string
    ){}
}