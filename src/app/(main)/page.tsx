import MainHeroSection from "./_components/MainHeroSection"
import MainFeatureSection from "./_components/MainFeatureSection"
import MainStepsSection from "./_components/MainStepsSection"

export default function page() {
  return (
    <div className="w-full flex flex-col">
      <MainHeroSection />
      <MainFeatureSection />
      <MainStepsSection />
    </div>
  )
}
