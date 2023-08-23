import express from 'express';
import cors from 'cors';
import getTechFeeds from './routes/TechRoute.js'

const app = express();

app.use(cors());
const port =  process.env.PORT || 8000;
app.use(express.json());
 

app.get('/', (req,res) => {
    res.status(200).json({message:'welocme to home page'})
} );

app.use('/api/getTechFeeds/', getTechFeeds)

app.listen(port, () => {
  console.log(`app running on ${port}`);
});


