import { useEffect, useState } from "react"
import '../App.css'
import { API } from '../utils'
import { CgProfile } from "react-icons/cg";


function Home() {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [comments, setComments] = useState([]);

  const fetchComments = (id) => {
    fetch(API + 'posts/' + id + '/comments/')
    .then(response => response.json())
    .then(data = setComments(comments))
    .catch(error => console.error('error while fetching comments', error));
  }


  useEffect(() => {
    fetchPosts();
  }, []);

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
  console.log(posts);

  if(selectedPost) {
    return (
      <div className="comments-page">
        {comments.map((comment) => (
          <p>{comment.content}</p>
        ))}
      </div>
    )
  }
  return (
    <div className="main-bar">
      <h2>Posts</h2>
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post.id} className="post-card" onClick={fetchComments(post.id)}>
            <CgProfile className="profile-icon"/>
            <div>
              <p>{post.user}</p>
              <p>{post.content}</p>
              <p>{post.created_at}</p>
            </div>
          </div>
        ))
      ) : (<div>No posts</div>)}
    </div>
  )
}

export default Home