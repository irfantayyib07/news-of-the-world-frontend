

function NewsItems({ title, description, imgUrl, newsUrl }) {
 return (
  <>
   <div className="card h-100">
    <img src={!imgUrl ? "https://www.smaroadsafety.com/wp-content/uploads/2022/06/no-pic.png" : imgUrl} className="card-img-top card-image" alt={"No Image Found"} />
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
