const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const {
    fetchBlogData,
    findLongestBlog,
    countBlogsWithPrivacy,
    getUniqueBlogTitles,
  } = require('./middleware');


  app.get('/api/blog-stats', async (req, res) => {
    try {
      const blogData = await fetchBlogData();
      const Data = blogData.blogs;
      const totalBlogs = Data.length;
      const longestBlog = findLongestBlog(Data);
      const blogsWithPrivacy = countBlogsWithPrivacy(Data);
      const uniqueBlogTitles = getUniqueBlogTitles(Data);
      
  
      const stats = {
        
        totalBlogs,
        longestBlog,
        blogsWithPrivacy,
        uniqueBlogTitles,
      };
  
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching and analyzing blog data.' });
    }
  });

  app.get('/',async(req,res)=>{
    const blogData = await fetchBlogData();
    res.json(blogData);
  })
  


  app.get('/api/blog-search', async (req, res) => {
    try {
      const query = req.query.query.toLowerCase();
      const blogData = await fetchBlogData();
      const Data = blogData.blogs;
      const matchingBlogs = Data.filter((blog) =>
        blog.title.toLowerCase().includes(query)
      );
  
      res.json(matchingBlogs);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while searching for blogs.' });
    }
  });
  


  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong on the server.' });
  });
  

app.listen(port,()=>{
    console.log(`server is running at port ${port}`)
})