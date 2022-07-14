//your app queries come here
module.exports = {
    sql : {
       INSERT: { 
           REGISTER: `insert into Users(name,email,password,deleteFlag) values("{name}","{email}","{password}",0);`,
           TWEET : `insert into Tweets(userId,tweet,deleteFlag) values({userId},"{tweet}",0)`,
           RETWEET : `insert into Retweets(userId,tweetId,deleteFlag) values({userId},{tweetId},0)`,
           FOLLOW : `insert into FollowList(follower,following,deleteFlag) values({userId},{followingId},0)`
       },
       UPDATE: { 
            TWEET: `update Tweets set deleteFlag=1 where id={tweetId}`,
            RETWEET : `update Retweets set deleteFlag=1 id={reTweetId}`,
            FOLLOW : `update FollowList set deleteFlag=1 following={followingId}`,
            USER : `update Users set deleteFlag=1 id={userId}`
       },
       SELECT: {
           LOGIN : `select name,id from Users where email="{email}" and password="{password}"`
        },
        DELETE : {
            
        }
    },
    mongo : {
      
    }
};