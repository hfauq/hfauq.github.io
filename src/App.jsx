import Hero from './components/Hero'
import Section from './components/Section'
import ProjectItem from './components/ProjectItem'
import PhotoGallery from './components/PhotoGallery'
import Footer from './components/Footer'

// Newest first; leave out url when there's no public page
const projects = [
  { name: 'Todoist Comms', url: 'https://www.todoist.com/comms', date: '2026' },
  { name: 'Todoist Ramble', url: 'https://www.todoist.com/ramble', date: '2025' },
  { name: 'Todoist calendar integrations', url: 'https://www.todoist.com/help/todoist/integrations/use-the-calendar-integration-rCqwLCt3G', date: '2024' },
  { name: 'Todoist calendar views', url: 'https://www.todoist.com/help/todoist/product-updates/whats-new-january-december-2024-cueCuXy76#h_01J016TXTFXAKP8KSXYJW93BD8', date: '2024' },
  { name: 'Todoist Teams', url: 'https://www.todoist.com/teams', date: '2023' },
  { name: 'Twist editor', url: 'https://twist.com/help/articles/whats-new-JPJ4HduH', date: '2022' },
  { name: 'Todoist task view', url: 'https://www.todoist.com/inspiration/todoist-new-task-view', date: '2022' },
  { name: 'Twist redesign', url: 'https://twist.com/help/articles/the-new-and-updated-twist-HSc4VzbsE', date: '2021' },
  { name: 'Todoist templates', url: 'https://www.todoist.com/templates', date: '2020' },
  { name: 'Todoist Sharing', url: 'https://www.todoist.com/help/todoist/features/collaborate-with-friends-or-family-in-todoist-tzkGUy', date: '2019' },
  { name: 'Todoist pricing', url: 'https://www.todoist.com/pricing', date: '2018' },
  { name: 'Twist launch', url: 'https://medium.com/ten-timezones/twist-mindful-team-communication-28e83e661e69', date: '2017' },
  { name: 'Todoist onboarding', url: 'https://www.todoist.com/help/todoist/get-started/get-started-with-todoist-OgNNJR', date: '2016' },
]

function App() {
  return (
    // isolate keeps the -z-10 texture layers above this background; clip hides the sun rays' overflow
    <div className="relative isolate overflow-x-clip min-h-screen bg-[#FBF9F5] dark:bg-[#11141D]">
      <div aria-hidden="true" className="grain pointer-events-none fixed inset-0 -z-10" />
      <div className="py-20 max-sm:py-10 px-5">
        {/* Hero Section */}
        <div className="mb-[54px]">
          <Hero />
        </div>

        {/* Projects Section */}
        <div className="mb-[54px]">
          <Section label="Projects">
            <div className="space-y-[24px]">
              {projects.map((project) => (
                <ProjectItem key={project.name} {...project} />
              ))}
            </div>
          </Section>
        </div>

        {/* Photos */}
        <div className="mb-[54px]">
          <PhotoGallery />
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  )
}

export default App
