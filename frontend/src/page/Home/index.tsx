import { SearchAppBar, Tab } from 'libs/ui/components'

export default function HomePage() {
  const tabItems = ['Top đánh giá', 'Gần bạn', 'Yêu thích'];
  return (
    <div>
      <SearchAppBar />
      <Tab tabItems={tabItems} />
    </div>
  )
}