// middleware.js
const axios = require('axios');
const _ = require('lodash');

const apiUrl = 'https://intent-kit-16.hasura.app/api/rest/blogs'; 
const headers = {
  'x-hasura-admin-secret': '32qR4KmXOIpsGPQKMqEJHGJS27G5s7HdSKO3gdtQd2kv5e852SiYwWNfxkZOBuQ6',
};


let fetchBlogData = _.memoize(async () => {
    try {
      const response = await axios.get(apiUrl, { headers });
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error('Failed to fetch blog data from the third-party API.');
      }
    } catch (error) {
      throw new Error('An error occurred while fetching blog data from the third-party API.');
    }
  }, () => {
    console.log('Using cached data...');
    return Date.now() / 1000 / 3600;
  });


// 

fetchBlogData()
  .then((blogData) => {
   
    console.log('Fetched blog data:', blogData);
  })
  .catch((error) => {
    console.error('An error occurred:', error.message);
  });


function findLongestBlog(blogData) {
    
    if (!Array.isArray(blogData) || blogData.length === 0) {
      return null; // Return null if the blog data is empty or not an array
    }
  
    const longestBlog = _.maxBy(blogData, (blog) => blog.title.length);
  
    return longestBlog;
  }

  function countBlogsWithPrivacy(blogData) {
    if (!Array.isArray(blogData) || blogData.length === 0) {
      return 0; 
    }
  
    const blogsWithPrivacy = blogData.filter((blog) =>
      blog.title.toLowerCase().includes('privacy')
    );
  
    return blogsWithPrivacy.length;
  }

  function getUniqueBlogTitles(blogData) {
    if (!Array.isArray(blogData) || blogData.length === 0) {
      return []; // Return an empty array if the blog data is empty or not an array
    }
  
    const uniqueTitlesSet = new Set();
  
    blogData.forEach((blog) => {
      uniqueTitlesSet.add(blog.title);
    });
  
    
    const uniqueTitlesArray = Array.from(uniqueTitlesSet);
  
    return uniqueTitlesArray;
  }

module.exports = {
  fetchBlogData,
  findLongestBlog,
  countBlogsWithPrivacy,
  getUniqueBlogTitles,
};
