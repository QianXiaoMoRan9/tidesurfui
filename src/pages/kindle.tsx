import * as React from "react";
const utils = require("@react-financial-charts/utils");
const scales = require("@react-financial-charts/scales")
const axis = require("@react-financial-charts/axes")
const core = require("@react-financial-charts/core")
const series = require("@react-financial-charts/series")

export interface IOHLCData {
    readonly close: number;
    readonly date: Date;
    readonly high: number;
    readonly low: number;
    readonly open: number;
    readonly volume: number;
}

interface KindleChartProps {
    readonly data: IOHLCData[];
    readonly height: number;
    readonly width: number;
    readonly ratio: number;
}

const xScaleProvider = scales.discontinuousTimeScaleProviderBuilder().inputDateAccessor(
    (d: IOHLCData) => d.date,
);

const yExtents = (data: IOHLCData) => {
    return [data.high, data.low];
};

export function Kindle(props: KindleChartProps) {
    const margin = {left: 0, right: 40, top: 0, bottom: 24};
    const {data: initialData, height, ratio, width} = props;

    const {data, xScale, xAccessor, displayXAccessor} = xScaleProvider(initialData);

    const max = xAccessor(data[data.length - 1]);
    const min = xAccessor(data[Math.max(0, data.length - 100)]);
    const xExtents = [min, max];

    return (
        <core.ChartCanvas
            height={height}
            ratio={ratio}
            width={width}
            margin={margin}
            data={data}
            displayXAccessor={displayXAccessor}
            seriesName="Data"
            xScale={xScale}
            xAccessor={xAccessor}
            xExtents={xExtents}
        >
            <core.Chart id={1} yExtents={yExtents}>
                <series.CandlestickSeries/>
                <axis.XAxis/>
                <axis.YAxis/>
            </core.Chart>
        </core.ChartCanvas>
    );
}
export const Daily = utils.withSize({ style: { minHeight: 600 } })(utils.withDeviceRatio()(Kindle));

export const Intraday = utils.withSize({ style: { minHeight: 600 } })(utils.withDeviceRatio()(Kindle));