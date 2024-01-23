

function NewsItems({ title, description, imgUrl, newsUrl }) {
 return (
  <>
   <div className="card h-100">
    <img src={!imgUrl ? "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=60&w=600&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bmV3c3xlbnwwfHwwfHx8MA%3D%3D" : imgUrl} className="card-img-top card-image" alt={"No Image Found"} />
    <div className="card-body d-flex flex-column">
     <h5 className="card-title">{title}...</h5>
     <p className="card-text">{description}...</p>
     <a href={newsUrl} target='_blank' className="btn btn-primary mt-auto d-block" style={{ width: "fit-content" }}>Read more</a>
    </div>
   </div>
  </>
 )
}

export default NewsItems;
