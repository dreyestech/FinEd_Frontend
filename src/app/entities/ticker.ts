export class Ticker{
    constructor(
        //public tickerSymbol: string,
        public closePrice: number,
        public highPrice: number,
        public lowPrice: number,
        public numTransactions: number,
        public openPrice: number,
        public otcBool: boolean,
        public timestampStart: number,
        public tradeVolume: number,
        public vwap: number
    ){}
}