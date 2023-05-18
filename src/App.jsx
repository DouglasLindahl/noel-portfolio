import { useState } from 'react'
import React from 'react';
import { useQuery } from 'graphql-hooks';
import './App.css'

const PORTFOLIOITEM_QUERY = `
query{
  allPortfolioItems{
    id
    title
    image{
      url
    }
    placeholderImage{
      url
    }
    info
  }
}
`;


function App() {
  const { data, loading, error } = useQuery(PORTFOLIOITEM_QUERY);


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  
  return (
    <div className="portfolioItemContainer">
      {data.allPortfolioItems.map((portfolioItem) => (
        <div className="portfolioItem" key={portfolioItem.id}>
  <h1>{portfolioItem.title}</h1>
  <div
    className="image-container"
    onMouseEnter={(e) => {
      e.currentTarget.querySelector('.image').src = portfolioItem.image.url;
    }}
    onMouseLeave={(e) => {
      e.currentTarget.querySelector('.image').src = portfolioItem.placeholderImage.url;
    }}
  >
    <img src={portfolioItem.placeholderImage.url} alt="" className="image" />
  </div>
</div>

      ))}
    </div>
  )
}

export default App
