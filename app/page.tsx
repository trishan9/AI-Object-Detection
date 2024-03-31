import ObjectDetection from "./_components/ObjectDetection";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen p-6 items-center">
      <h1 className="text-4xl text-gradient py-4 sm:text-6xl tracking-tighter font-bold">
        AI Object Detector
      </h1>

      <ObjectDetection />
    </main>
  );
}
