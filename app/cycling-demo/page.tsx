import CyclingFeaturesDisplay from "@/components/cycling-features-display"

export default function CyclingDemoPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <div className="text-center">
        <h1 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">
          Our Platform Offers{" "}
          <CyclingFeaturesDisplay
            textClassName="text-3xl md:text-5xl font-bold text-brand"
            featureWords={["Innovation", "Speed", "Security", "Results"]}
            staticMobileWord="Precision"
          />
        </h1>
        <p className="text-muted-foreground mb-2">
          Resize your browser window or view on a mobile device to see the change.
        </p>
        <p className="text-sm text-muted-foreground/80">
          Desktop: Shows cycling words like Innovation, Speed, etc.
          <br />
          Mobile: Shows "Precision".
        </p>
      </div>

      <div className="mt-12 p-6 border rounded-lg bg-card w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-card-foreground">Customized Example:</h2>
        <p className="text-lg text-card-foreground">
          Experience unparalleled{" "}
          <CyclingFeaturesDisplay
            featureWords={["Growth", "Efficiency", "Success"]}
            interval={2500}
            staticMobileWord="Focus"
            textClassName="text-lg text-primary font-medium"
          />{" "}
          with our tools.
        </p>
      </div>
    </div>
  )
}
