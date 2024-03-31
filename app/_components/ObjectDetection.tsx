"use client";

import { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { load } from "@tensorflow-models/coco-ssd";
import "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-cpu";
import "@tensorflow/tfjs-backend-webgl";
import renderPredictions, { TPredictions } from "@/lib/renderPredictions";

let detectInterval;

const ObjectDetection = () => {
  const [isLoading, setIsLoading] = useState(true);
  const webcamRef = useRef<Webcam | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const initializeModel = async () => {
    try {
      setIsLoading(true);

      const model = await load();

      detectInterval = setInterval(() => {
        runObjectDetection(model);
      }, 10);
    } finally {
      setIsLoading(false);
    }
  };

  const runObjectDetection = async (model: any) => {
    if (
      canvasRef.current &&
      webcamRef.current != null &&
      webcamRef.current.video?.readyState == 4
    ) {
      canvasRef.current.width = webcamRef.current.video.videoWidth;
      canvasRef.current.height = webcamRef.current.video.videoHeight;

      const detectedObjects: TPredictions = await model.detect(
        webcamRef.current.video,
        undefined,
        0.6 // 60% above accuracy required
      );

      const ctx = canvasRef.current.getContext("2d");
      //@ts-ignore
      renderPredictions(detectedObjects, ctx);
    }
  };

  const showMyVideo = () => {
    if (webcamRef.current != null && webcamRef.current.video?.readyState == 4) {
      const myVideoWidth = webcamRef.current.video.videoWidth;
      const myVideoHeight = webcamRef.current.video.videoHeight;

      webcamRef.current.video.width = myVideoWidth;
      webcamRef.current.video.height = myVideoHeight;
    }
  };

  useEffect(() => {
    initializeModel();
    showMyVideo();
  }, []);

  return (
    <div className="my-6">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="relative flex justify-center items-center gradient p-2 rounded-md">
          {/* Webcam */}
          <Webcam
            ref={webcamRef}
            muted
            className="rounded-md w-full lg:h-[720px]"
          />

          <canvas
            className="absolute top-0 left-0 z-50 w-full lg:h-[720px]"
            ref={canvasRef}
          ></canvas>
        </div>
      )}

      <footer className="flex justify-center items-center my-4">
        <p className="text-gradient text-lg font-semibold py-2">
          Created with ❤️ by Trishan
        </p>
      </footer>
    </div>
  );
};

export default ObjectDetection;
