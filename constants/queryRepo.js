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
            RETWEET : `update Retweets set deleteFlag=1 where id={reTweetId}`,
            FOLLOW : `update FollowList set deleteFlag=1 where following={followingId}`,
            USER : `update Users set deleteFlag=1 where id={userId}`,
            FOLLOWUSER : `update FollowList set deleteFlag=1 where following={userId} or follower={userId}`,
            TWEETUSER : `update Tweets set deleteFlag=1 where userId={userId}`,
            RETWEETUSER : `update ReTweets set deleteFlag=1 where userId={userId}`
       },
       SELECT: {
           LOGIN : `select name,id from Users where email="{email}" and password="{password}" and deleteFlag=0`,
           TWEET : `select T.id,T.userId,U.name,T.tweet,T.created_at,0 as retweeterId from Tweets T, Users U where userId in(select following from FollowList where follower={userId} and deleteFlag=0) and U.id=T.userId and U.deleteFlag=0 and T.deleteFlag=0 order by created_at desc;`,
           RETWEET : `select T.id,T.userId,U.name,T.tweet,R.created_at,R.userId as retweeterId,RU.name as retweeter_name from Users U,Users RU,Tweets T join Retweets R on T.id=R.tweetId where R.userId in(select following from FollowList where follower={userId} and deleteFlag=0) and T.userId!={userId} and RU.id=R.userId and U.id=T.userId and T.deleteFlag=0 and R.deleteFlag=0 and RU.deleteFlag=0 order by created_at desc;`,
           USERTWEET : `select distinct(T.id),T.userId,U.name,T.tweet,T.created_at,0 as retweeterId from Tweets T, Users U where userId={userId} and U.id=T.userId and U.deleteFlag=0 and T.deleteFlag=0 order by created_at desc;`,
           USERRETWEET : `select distinct(T.id),T.userId,U.name,T.tweet,R.created_at,R.userId as retweeterId,RU.name as retweeter_name from Users U,Users RU,Tweets T join Retweets R on T.id=R.tweetId where R.userId={userId} and T.userId!={userId} and RU.id=R.userId and U.id=T.userId and T.deleteFlag=0 and R.deleteFlag=0 and RU.deleteFlag=0 order by created_at desc;`,
           SEARCHTWEET : `select T.id,T.userId,U.name,T.tweet,T.created_at,0 as retweeterId from Tweets T, Users U where T.tweet like "%{searchKey}%" and T.deleteFlag=0 and T.userId=U.id`,
           SEARCHUSER : `select name,id from Users where name like "%{searchKey}%" and deleteFlag=0`,
           FOLLOWERS : `select U.name,U.id from Users U,(SELECT (CASE WHEN COUNT(*) > 0 THEN true ELSE false END) FROM Twitter.FollowList where follower={id} and following=U.id) FollowList F where F.following="{userId}" and F.follower=U.id and F.deleteFlag=0`,
           FOLLOWING : `select U.name,U.id,(SELECT (CASE WHEN COUNT(*) > 0 THEN true ELSE false END) FROM Twitter.FollowList where follower={id} and following=U.id) as follow from Users U, FollowList F where F.follower={userId} and F.following=U.id and F.deleteFlag=0;`,
        },
        DELETE : {
            
        }
    },
    mongo : {
      
    }
};