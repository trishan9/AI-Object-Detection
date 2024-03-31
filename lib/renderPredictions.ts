const renderPredictions = (predictions : TPredictions, ctx: CanvasRenderingContext2D) => {
    ctx?.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    const font = "16px sans-serif";
    ctx.font = font;
    ctx.textBaseline = "top";

    predictions.forEach((prediction: TPredictionData) => {
        const [x, y, width, height] = prediction["bbox"];
        const isPerson = prediction.class === "person";

        ctx.strokeStyle = isPerson ? "#FF0000" : "#00FFFF";
        ctx.lineWidth = 4;
        ctx.strokeRect(x, y, width, height);

        ctx.fillStyle = `rgba(255, 0, 0, ${isPerson ? 0.2 : 0})`;
        ctx.fillRect(x, y, width, height);

        ctx.fillStyle = isPerson ? "#FF0000" : "#00FFFF";
        const textWidth = ctx.measureText(prediction.class).width;
        const textHeight = parseInt(font, 10); // base 10
        ctx.fillRect(x, y, textWidth + 4, textHeight + 4);

        ctx.fillStyle = "#000000";
        ctx.fillText(prediction.class, x, y);    
    })
}

export type TPredictions = TPredictionData[];

type TPredictionData = {
    bbox: number[];
    class: string;
    score: number;
}

export default renderPredictions;