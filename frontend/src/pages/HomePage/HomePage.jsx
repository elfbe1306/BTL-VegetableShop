import React from 'react'
import HomePageHeader from '../../components/HomePageHeader/HomePageHeader'
import ImageSlider from '../../components/ImageSlider/ImageSlider';
import BannerBar from '../../components/BannerBar/BannerBar';


function HomePage() {
  return (
    <div>
      <HomePageHeader />
      <ImageSlider />
      <BannerBar />
      
    </div>
  )
}

export default HomePage