import { useEffect, useState } from "react"
import '../App.css'
import { API } from '../utils'
import { CgProfile } from "react-icons/cg";


function Home({ token }) {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');

  /**retrieves comments for the selected post */
  const fetchComments = (id) => {
    setSelectedPost(id);

    fetch(API + 'posts/' + id + '/comments/', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => response.json())
    .then(data => setComments(data))
    .catch(error => console.error('error while fetching comments', error));
  }


  useEffect(() => {
    fetchPosts();
  }, [comments]);

  /**retrieves posts from the database */
  const fetchPosts = () => {
    fetch(API + 'posts/')
    .then(response => {
      if(response.ok) {
        return response.json();
      } else {
        console.log('error');
      }
    })
    .then(data => setPosts(data))
    .catch(error => console.error('error:', error));
  }

  /**check if user has clicked a certain post then 
   * navigate to the post page with its comments */
  if(selectedPost) {
    const post = posts.find((p) => p.id === selectedPost)


    const addComment = () => {
      if(!comment.trim()) return

      /**Sends a post request to add a new comment */
      fetch(API + `posts/${post.id}/comments/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({content: comment})
      })
      .then(response => response.json())
      .then(newComment => setComments((prev) => [...prev, newComment]))
      .catch(error => console.error('error posting a comment', error))

      setComment('');
    }

    /**Display comments when a partcular post is clicked */
    return (
      <div className="comments-page">
        <div className="comments-profile">
          <img id="profile-post-icon" src={post.user.profile_pic} alt="" />
          <div className="comment-post-user">
            <p>{post.user.first_name} {post.user.last_name}</p>
            <p>@{post.user.username}</p>
          </div>
        </div>
        <p>{post.content}</p>
        <p>{new Date(post.created_at).toDateString()}</p>
        <button onClick={() => setSelectedPost(null)}>Back</button>
        {comments.length > 0 ?  comments.map((comment) => (
          <div key={comment.id} className="comment-card">
            <img id="profile-post-icon" src={comment.user.profile_pic} alt="" />
            <div>
              <p>{comment.user.username}</p>
              <p>{comment.content}</p>
              <p>{comment.created_at}</p>
            </div>
          </div>
        )): (
          <div>No comments yet</div>
        )}
        <input type="text" placeholder="Add a message..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button onClick={addComment} className="send-comment-btn">send</button>
        
      </div>
    )
  }

  /**Displays all the posts from the database */
  return (
    <div className="main-bar">
      <h2>Posts</h2>
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post.id} className="post-card" onClick={() => fetchComments(post.id)}>
            <div className="post-profile">
              <img src={post.user.profile_pic} id="profile-post-icon"/>
              <div>
                <p>{post.user.first_name} {post.user.last_name} @{post.user.username}</p>
              </div>
            </div>
            <div className="post-content">
              <p>{post.content}</p>
            </div>
            <div>
              {post.image ? <img id="post-image" src={post.image} alt="" /> : ('')}
            </div>
          </div>
        ))
      ) : (<div>No posts</div>)}
    </div>
  )
}

export default Home