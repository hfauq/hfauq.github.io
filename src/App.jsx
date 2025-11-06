import Hero from './components/Hero'
import Location from './components/Location'
import Section from './components/Section'
import WorkItem from './components/WorkItem'
import PodcastItem from './components/PodcastItem'
import PhotoGallery from './components/PhotoGallery'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#1C1C1C]">
      <div className="py-20 max-[1199px]:py-10 px-5">
        {/* Hero Section */}
        <div className="mb-[54px]">
          <Hero />
        </div>

        {/* Location Section */}
        <div className="mb-[54px]">
          <Location />
        </div>

        {/* Work Section */}
        <div className="mb-[54px]">
          <Section label="Work">
            <div className="space-y-[24px]">
              <WorkItem 
                company="Doist"
                companyUrl="https://doist.com"
                role="Product Manager"
                period="2020 —"
              />
              <WorkItem 
                company="Doist"
                companyUrl="https://doist.com"
                role="Growth Manager"
                period="2016 — 2020"
              />
            </div>
          </Section>
        </div>

        {/* Podcast Section */}
        <div className="mb-[54px]">
          <Section label="Podcast">
            <div className="space-y-[24px]">
              <PodcastItem 
                title="Growth Makers (French)"
                url="https://growthmakers.fr/ep-46-hugo-fauquenoi-doist-30000-signups/"
                date="Oct 2017"
              />
              <PodcastItem 
                title="Nomad Show (French)"
                url="https://soundcloud.com/lenomadeshow/le-futur-du-travail-avec-hugo-fauquenoi-de-doist"
                date="Aug 2017"
              />
            </div>
          </Section>
        </div>

        {/* Photos Section */}
        <div className="mb-[54px]">
          <Section label="Photos">
            <PhotoGallery />
          </Section>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  )
}

export default App
