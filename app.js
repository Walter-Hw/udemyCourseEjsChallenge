const _ = require('lodash');
const express = require('express');
const mongoose = require('mongoose');
const { ID } = require('./config');
const { KEY } = require('./config');

const app = express();

const homeStartingContent = `Cupidatat dolor ex proident aliqua ex ad nulla velit quis labore laboris tempor. Excepteur sunt amet anim non sunt labore nisi adipisicing id tempor elit commodo. Ea id dolore voluptate reprehenderit irure fugiat elit adipisicing sit. Consequat commodo eiusmod aliqua est minim occaecat quis elit excepteur eiusmod et id.`;

const aboutContent = `Amet eu laboris ipsum elit id mollit exercitation incididunt ex. Excepteur sit sunt reprehenderit voluptate nulla anim ullamco sunt cillum sint qui cillum labore. Tempor occaecat elit aute laboris qui minim quis cillum. Aliqua adipisicing quis mollit velit minim. Tempor in adipisicing anim ipsum sint in cillum non qui eiusmod cillum. Ipsum consequat nisi irure officia nisi culpa esse eiusmod id adipisicing in Lorem incididunt non. Sunt sit quis aute ipsum est incididunt ullamco exercitation.`;

const contactContent = `Est amet labore culpa dolor irure in sunt ut do aliqua id pariatur cillum incididunt. Qui sit fugiat fugiat occaecat qui cillum et magna est ipsum. Laborum exercitation incididunt in sit laboris ea quis quis deserunt magna occaecat.`;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

mongoose.connect(`mongodb+srv://${ID}:${KEY}@cluster0.zvnci.mongodb.net/blogDB`, { 
  useNewUrlParser:true,
  useUnifiedTopology: true ,
  useFindAndModify: false
});

const postSchema = mongoose.Schema({
  title: String,
  content: String
});

const Post = mongoose.model('Post', postSchema);

app.get('/', (req, res) => {

  Post.find({}, (err, results) => {
    res.render('home', {
      homeText: homeStartingContent,
      posts: results
    });
    console.log('Posts--->', results);
  });


  
});


app.get('/compose', (req, res) => {
  res.render('compose');
});

app.get('/post/:postName', (req, res) => {
  
  const pName = _.lowerCase(req.params.postName);
  
  posts.forEach((post) => {
    
    const pTitle = _.lowerCase(post.title);
    if (pName === pTitle) {
      res.render('post', { pTitle: post.title, pBody: post.body});
    }
    
  });
  
});

app.post('/compose', (req, res) => {
  const post = new Post({
    title: req.body.composeTitle,
    content: req.body.postBody
  })
  
  post.save();
  res.redirect('/');
});

app.get('/about', (req, res) => {
  res.render('about', { aboutText: aboutContent});
});

app.get('/contact', (req, res) => {
  res.render('contact', { contactText: contactContent });
});

app.listen(process.env.PORT || 3000, () => { 
  console.log('Server starting now...');
});