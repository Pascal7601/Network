import { useEffect, useState } from "react"
import '../App.css'
import { API } from '../utils'
import { CgProfile } from "react-icons/cg";
import { TfiPlus } from "react-icons/tfi";

function MainPage({ token }) {
  const [products, setProducts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');
  const [addProductBox, setAddProductBox] = useState(false);
  const [product, setProduct] = useState({
    productName: '',
    category: '',
    description: '',
    image: null
  });

  /**retrieves comments for the selected post */
  // const fetchComments = (id) => {
  //   setSelectedPost(id);

  //   fetch(API + 'product/' + id + '/comments/', {
  //     headers: {
  //       'Authorization': `Bearer ${token}`
  //     }
  //   })
  //   .then(response => response.json())
  //   .then(data => setComments(data))
  //   .catch(error => console.error('error while fetching comments', error));
  // }


  useEffect(() => {
    fetchProducts();
  }, [products]);

  /**retrieves product from the database */
  const fetchProducts = () => {
    fetch(API + 'products/')
    .then(response => {
      if(response.ok) {
        return response.json();
      } else {
        console.log('error');
      }
    })
    .then(data => setProducts(data))
    .catch(error => console.error('error:', error));
  }

  /**check if user has clicked a certain post then 
   * navigate to the post page with its comments */
  // if(selectedPost) {
  //   const post = products.find((p) => p.id === selectedPost)


    // const addComment = () => {
    //   if(!comment.trim()) return

    //   /**Sends a post request to add a new comment */
    //   fetch(API + `product/${post.id}/comments/`, {
    //     method: 'POST',
    //     headers: {
    //       'Authorization': `Bearer ${token}`,
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({content: comment})
    //   })
    //   .then(response => response.json())
    //   .then(newComment => setComments((prev) => [...prev, newComment]))
    //   .catch(error => console.error('error posting a comment', error))

    //   setComment('');
    // }

    /**Display comments when a partcular post is clicked */
    // return (
    //   <div className="comments-page">
    //     <div className="comments-profile">
    //       <img id="profile-post-icon" src={post.user.profile_pic} alt="" />
    //       <div className="comment-post-user">
    //         <p>{post.user.first_name} {post.user.last_name}</p>
    //         <p>@{post.user.username}</p>
    //       </div>
    //     </div>
    //     <p>{post.content}</p>
    //     <p>{new Date(post.created_at).toDateString()}</p>
    //     <button onClick={() => setSelectedPost(null)}>Back</button>
    //     {comments.length > 0 ?  comments.map((comment) => (
    //       <div key={comment.id} className="comment-card">
    //         <img id="profile-post-icon" src={comment.user.profile_pic} alt="" />
    //         <div>
    //           <p>{comment.user.username}</p>
    //           <p>{comment.content}</p>
    //           <p>{comment.created_at}</p>
    //         </div>
    //       </div>
    //     )): (
    //       <div>No comments yet</div>
    //     )}
    //     <input type="text" placeholder="Add a message..."
    //       value={comment}
    //       onChange={(e) => setComment(e.target.value)}
    //     />
    //     <button onClick={addComment} className="send-comment-btn">send</button>
        
    //   </div>
    // )
  // }

  const handleSubmit = () => {
    console.log(product)
    if(!product.productName && !product.description && !product.image) {
      return
    }
    setProduct({
      productName: '',
      description: '',
      category: '',
      category_order: '',
      image: null
    });
    const formData = new FormData();
    formData.append("name", product.productName);
    formData.append("description", product.description);
    formData.append("category", product.category);
    formData.append("image", product.image);

    fetch(API + 'products/new/', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      setProducts(data);
      setAddProductBox(false);
    })
    .catch(error => console.log(error))
  }

  /**Displays all the product from the database */
  return (
    <div className="main-bar">
      <div id="float-plus-icon" onClick={() => setAddProductBox(true)}>
        <TfiPlus/>
      </div>
      {products.length > 0 ? (
        products.map((post) => (
          <div key={post.id} className="product-card" onClick={() => fetchComments(post.id)}>
            <div className="product-view">
              <div className="product-image">
                {post.image ? <img id="post-image" src={post.image} alt="" /> : ('')}
              </div>
              <div className="product-description">
                <p>{post.name}</p>
                <p>{post.description}</p>
              </div> 
              <div className="product-price">
                <p>KES 20,000</p>
                <button>View More Details</button>
              </div> 
            </div>
          </div>
        ))
      ) : (<div>No product</div>)}

      {/** the product box display for adding products after
       * the plus icon is clicked
       */}
      {addProductBox && (
        <div className="modal-overlay">
          <div className="add-product-box">
            <h3>Add new product</h3>
            <input type="text" placeholder="product name"
              value={product.productName}
              onChange={(e) => setProduct({ ...product, productName: e.target.value })}/>

            <input type="text" placeholder="description"
              value={product.description}
              onChange={(e) => setProduct({ ...product, description: e.target.value })}/>

            <select value={product.category} onChange={(e) => setProduct({ ...product, category: e.target.value })}>
              <option value="">Select category</option>
              <option value="1">Category 1</option>
              <option value="2">Category 2</option>
              <option value="3">Category 3</option>
            </select>
            {/* <input type="number" placeholder="category order"
              value={product.category_order}
              onChange={(e) => setProduct({ ...product, category_order: e.target.value })}/> */}

            <input type="file" accept="image/*"
              onChange={(e) => setProduct({ ...product, image: e.target.files[0] })}/>

            <div className="modal-buttons">
              <button onClick={handleSubmit} className="submit-btn">Submit</button>
              <button onClick={() => setAddProductBox(false)} className="cancel-btn">Cancel</button>
            </div>
          </div>
        </div>
        )}
    </div>
  )
}

export default MainPage