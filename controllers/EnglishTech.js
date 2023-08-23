import axios from 'axios'
import {parseString} from 'xml2js'
import he from 'he'
import cheerio from 'cheerio'
import memoryCache from 'memory-cache';

const getFeedsABP = async() => {
    try{
        const responseABP = await axios.get('https://www.abplive.com/news/india/feed');
        const xmlDataABP = responseABP.data;
        
        let jsonDataABP;
        parseString(xmlDataABP, (err,resultABP) => {
            if(err){
                throw new Error("Failed to parse xml")
            }
            jsonDataABP = resultABP
        })

        let extractedFeedsABP = jsonDataABP.rss.channel[0].item ;
            let extractedDataABP = extractedFeedsABP.map(feed => {
                const title = feed.title[0];
            const encodedText = feed.description[0];
            const decodedText = he.decode(encodedText);
            const descplain = cheerio.load(decodedText)
            const description = descplain.root().text().slice(0,250);
            const link = feed.link[0];
            const imageurl = feed["media:thumbnail"][0].$.url;
            const channel = "ABP"
            return { title, link, imageurl, description, channel }
        })
        return(extractedDataABP)
    }
    catch(err){
        return([])
    }
}

const getFeedsNavBharatTimes = async() => {
    try{
        const responseNavBharatTimes = await axios.get('https://navbharattimes.indiatimes.com/rssfeedsdefault.cms');
        const xmlDataNavBharatTimes = responseNavBharatTimes.data;
        
        let jsonDataNavBharatTimes;
        parseString(xmlDataNavBharatTimes, (err,resultNavBharatTimes) => {
            if(err){
                throw new Error("Failed to parse xml")
            }
            jsonDataNavBharatTimes = resultNavBharatTimes
        })

        let extractedFeedsNavBharatTimes = jsonDataNavBharatTimes.rss.channel[0].item ;
        let extractedDataNavBharatTimes = extractedFeedsNavBharatTimes.map(feed => {
            const title = feed.title[0];
            const link = feed.link[0];
            const encodedText = feed["content:encoded"][0];
            const decodedText = he.decode(encodedText);
            const descplain = cheerio.load(decodedText)
            const description = descplain.root().text();
            const regex = /<img[^>]+src="([^">]+)"/g;
            const match = regex.exec(encodedText);
            const imageurl = match ? match[1] : null;
            const channel = "NavBharat Times"
            return { title, link, imageurl, description, channel } 
        })
        return(extractedDataNavBharatTimes)
    }
    catch(err){
        return ([])
    }
}

const getFeedsTV9 = async() => {
    try{
        const responseTV9 = await axios.get('https://www.tv9hindi.com/feed');
        const xmlDataTV9 = responseTV9.data;
        
        let jsonDataTV9;
        parseString(xmlDataTV9, (err,resultTV9) => {
            if(err){
                throw new Error("Failed to parse xml")
            }
            jsonDataTV9 = resultTV9
        })

        let extractedFeedsTV9 = jsonDataTV9.rss.channel[0].item ;
        let extractedDataTV9 = extractedFeedsTV9.map(feed => {
            const title = feed.title[0];
            const link = feed.link[0];
            const encodedText = feed["content:encoded"][0];
            const decodedText = he.decode(encodedText);
            const descplain = cheerio.load(decodedText)
            const description = descplain.root().text();
            const regex = /<img[^>]+src="([^">]+)"/g;
            const match = regex.exec(encodedText);
            const imageurl = match ? match[1] : null;
            const channel = "TV 9"
            return { title, link, imageurl, description, channel } 
        })
        return(extractedDataTV9)
    }
    catch(err){
        return ([])
    }
}


const getFeedsNDTV = async() => {
    try{
        const responseNDTV = await axios.get('https://feeds.feedburner.com/ndtvkhabar-latest');
        const xmlDataNDTV = responseNDTV.data;

        let jsonDataNDTV; 
        parseString(xmlDataNDTV, (err, resultNDTV) => {
            if (err) {
                throw new Error('Failed to parse XML');
            }
            jsonDataNDTV = resultNDTV
        });
        const extractedFeedsNDTV = jsonDataNDTV.rss.channel[0].item; 
        const extractedDataNDTV = extractedFeedsNDTV.map(feed => {
            const title = feed.title[0]
            const link = feed.link[0]
            const imageurl = feed["media:content"][0].$.url
            const description = feed.description[0]
            const channel = "NDTV"
            return{ title, link, imageurl, description, channel }
        })
        return(extractedDataNDTV)
    }
    catch(err){
        return([])
    }
}

const getFeedsIndiaTv =  async() => {
    try{
        const responseIndiaTv = await axios.get('https://www.indiatv.in/rssnews/topstory-india.xml')
        const xmlDataIndiaTV = responseIndiaTv.data

        let jsonDataIndiaTv;

        parseString(xmlDataIndiaTV, (err, resultIndiaTv) => {
            if(err){
                throw new Error('Failed to parse XML')
            }
            jsonDataIndiaTv = resultIndiaTv
        })

        let extractedFeedsIndiaTv = jsonDataIndiaTv.rss.channel[0].item
        const extractedDataIndiaTv = extractedFeedsIndiaTv.map(feed => {
            const title = feed.title[0]
            const link = feed.link[0]
            const encodedText = feed.description[0]
            const decodedText = he.decode(encodedText);
            const descplain = cheerio.load(decodedText)
            const description = descplain.root().text();
            const regex = /<img[^>]+src="([^">]+)"/g;
            const match = regex.exec(encodedText);
            const imageurl = match ? match[1] : null;
            const channel = "India Tv"
            return{ title, link, imageurl, description, channel }
        })
        return(extractedDataIndiaTv)
    }
    catch(err){
        []
    }
}

const getFeedsNews18 = async() => {
    try {
        const responseNews18 = await axios.get('https://hindi.news18.com/rss/khabar/nation/nation.xml');
        const xmlDatanews18 = responseNews18.data;
    
        let jsonDataNews18;

        parseString(xmlDatanews18, (err, resultNews18) => {
          if (err) {
            throw new Error('Failed to parse XML');
          }
          jsonDataNews18 = resultNews18
        });
        
        const extractedFeedsNews18 = jsonDataNews18.rss.channel[0].item
        const extractedDataNews18 = extractedFeedsNews18.map(feed => {
            const title = feed.title[0]
            const link = feed.link[0]
            const imageurl = feed["media:content"][0].$.url
            const description = feed.description[0]
            const  channel = "News 18"
            return{ title, link, imageurl, description, channel }
        })
        return(extractedDataNews18)
    }
    catch(err) {
        return([])
    }
}

const getFeedsOneIndia = async() => {
    try {
        const responseOneIndia = await axios.get('https://hindi.oneindia.com/rss/feeds/hindi-news-fb.xml');
        const xmlDataOneIndia = responseOneIndia.data;
    
        let jsonDataOneIndia;

        parseString(xmlDataOneIndia, (err, resultOneIndia) => {
          if (err) {
            throw new Error('Failed to parse XML');
          }
          jsonDataOneIndia = resultOneIndia
        });
        
        const extractedFeedsOneIndia = jsonDataOneIndia.rss.channel[0].item
        const extractedDataOneIndia = extractedFeedsOneIndia.map(feed => {
            const title = feed.title[0]
            const link = feed.link[0]
            const imageurl = feed["media:content"][0].$.url
            const description = feed.description[0]
            const channel = "One India"
            return{ title, link,imageurl, description, channel }
        })
        return(extractedDataOneIndia)
    }
    catch(err) {
        return([])
    }
}

const getFeedsDainikBhaskar = async() => {
    try{
        const responseDainikBhaskar = await axios.get('https://www.bhaskarhindi.com/rss/national');
        const xmlDataDainikBhaskar = responseDainikBhaskar.data;
        
        let jsonDataDainikBhaskar;
        parseString(xmlDataDainikBhaskar, (err,resultDainikBhaskar) => {
            if(err){
                throw new Error("Failed to parse xml")
            }
            jsonDataDainikBhaskar = resultDainikBhaskar
        })

        let extractedFeedsDainikBhaskar = jsonDataDainikBhaskar.rss.channel[0].item ;
        let extractedDataDainikBhaskar = extractedFeedsDainikBhaskar.map(feed => {
            const title = feed.title[0];
            const link = feed.link[0];
            const encodedText = feed["content:encoded"][0];
            const decodedText = he.decode(encodedText);
            const descplain = cheerio.load(decodedText)
            const description = descplain.root().text();
            const imageurl = feed.image[0]
            const channel = "Dainik Bhaskar"
            return { title, link, imageurl, description, channel } 
        })
       return(extractedDataDainikBhaskar)
    }
    catch(err){
       return([])
    }
}

const flattenArrayByPattern = (arr) => {
    const maxLength = Math.max(...arr.map(subArray => subArray.length));
  
    const flattenedArray = Array.from({ length: maxLength }, (_, i) =>
      arr.map(subArray => subArray[i]).filter(Boolean)
    ).flat();
  
    return flattenedArray;
  }

  const cacheDuration = 60 * 5;

  const getCachedFeeds = async (cacheKey, fetchDataFunction) => {
    const cachedData = memoryCache.get(cacheKey);
    
    if (cachedData) {
      return cachedData;
    } else {
      const fetchedData = await fetchDataFunction();
      memoryCache.put(cacheKey, fetchedData, cacheDuration * 1000); return fetchedData;
    }
  };
  export const EnglishTechFeeds = async (req, res) => {
    try {
      const cacheKey = 'cachedEnglishTechFeeds'; // Define a unique cache key
      const cachedFeeds = await getCachedFeeds(cacheKey, async () => {
        const feedsABP = await getFeedsABP();
        const feedsNavBharatTimes = await getFeedsNavBharatTimes();
        const feedsTV9 = await getFeedsTV9();
        const feedsNDTV = await getFeedsNDTV();
        const feedsIndiaTv = await getFeedsIndiaTv();
        const feedsNews18 = await getFeedsNews18();
        const feedsOneIndia = await getFeedsOneIndia();
        const feedsDainikBhaskar = await getFeedsDainikBhaskar();
  
        const allFeeds = [
          feedsABP,
          feedsNavBharatTimes,
          feedsTV9,
          feedsNDTV,
          feedsIndiaTv,
          feedsNews18,
          feedsOneIndia,
          feedsDainikBhaskar,
        ];
  
        return flattenArrayByPattern(allFeeds);
      });
  
      res.status(200).json(cachedFeeds);
    } catch (err) {
      res.status(500).json({ msg: 'Failed to retrieve feeds' });
    }
  };