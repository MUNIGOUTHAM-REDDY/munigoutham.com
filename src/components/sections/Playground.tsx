import { playgroundItems } from '../../data/portfolio'
import SectionHeader from './SectionHeader'
import CircularGallery from '../CircularGallery'

const galleryItems = playgroundItems.map((item, i) => ({
  image: `https://picsum.photos/seed/${i + 20}/800/600`,
  text: item.title,
}))

export default function Playground() {
  return (
    <section id="playground" className="py-20 md:py-28">
      <div className="px-6 md:px-12 max-w-6xl mx-auto [&>div]:mb-4 [&>div]:md:mb-6">
        <SectionHeader title="Playground" />
      </div>

      <div className="relative w-full" style={{ height: '600px' }}>
        <CircularGallery
          items={galleryItems}
          bend={1}
          textColor="#ffffff"
          borderRadius={0.05}
          scrollSpeed={2}
          scrollEase={0.05}
        />
      </div>
    </section>
  )
}
