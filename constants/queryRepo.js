//your app queries come here
module.exports = {
    sql : {
       INSERT: { 
           REGISTER: `insert into Users(name,email,password,created_at,deleteFlag) values("{name}","{email}","{password}","{cur_date}",0);`,
           TWEET : `insert into Tweets(userId,tweet,deleteFlag) values({userId},"{tweet}",0)`,
           RETWEET : `insert into Retweets(userId,tweetId,deleteFlag) values({userId},{tweetId},0)`,
           FOLLOW : `insert into FollowList(follower,following,deleteFlag) values({userId},{followingId},0)`
       },
       UPDATE: { 
            TWEET: `update Tweets set deleteFlag=1 where id={tweetId}`,
            RETWEET : `update Twitter.Retweets set deleteFlag=1 where tweetId ={tweetId} and userId={userId} and deleteFlag=0`,
            FOLLOW : `update FollowList set deleteFlag=1 where following={followingId} and follower={userId}`,
            USER : `update Users set deleteFlag=1 where id={userId}`,
            FOLLOWUSER : `update FollowList set deleteFlag=1 where following={userId} or follower={userId}`,
            TWEETUSER : `update Tweets set deleteFlag=1 where userId={userId}`,
            RETWEETUSER : `update ReTweets set deleteFlag=1 where userId={userId}`
       },
       SELECT: {
           LOGIN : `select name,id from Users where email="{email}" and password="{password}" and deleteFlag=0`,

           TWEET : `select T.id,T.userId,U.name,T.tweet,T.created_at,0 as retweeterId,
                    (SELECT (CASE WHEN COUNT(*) > 0 THEN true ELSE false END) FROM Retweets Rp, Tweets Tp 
                    where Tp.id=Rp.tweetId and Rp.userId={userId} and Tp.id=T.id and Rp.deleteFlag=0 and Tp.deleteFlag=0) 
                    as reTweeted from Tweets T, Users U where (userId={userId} or userId in(select following from FollowList where follower={userId} 
                    and deleteFlag=0)) and U.id=T.userId and U.deleteFlag=0 and T.deleteFlag=0 order by created_at desc;`,

           RETWEET : `select T.id,T.userId,U.name,T.tweet,R.created_at,R.userId as retweeterId,RU.name as retweeter_name,
                    (SELECT (CASE WHEN COUNT(*) > 0 THEN true ELSE false END) FROM Retweets Rp, Tweets Tp 
                    where Tp.id=Rp.tweetId and Rp.userId={userId} and Tp.id=T.id and Rp.deleteFlag=0 and Tp.deleteFlag=0) 
                    as reTweeted from Users U,Users RU,Tweets T join Retweets R on T.id=R.tweetId 
                    where (R.userId={userId} or R.userId in(select following from FollowList where follower={userId} and deleteFlag=0)) and 
                    RU.id=R.userId and U.id=T.userId and T.deleteFlag=0 and R.deleteFlag=0 and RU.deleteFlag=0 order by created_at desc;`,
           
           USERTWEET : `select distinct(T.id),T.userId,U.name,T.tweet,T.created_at,0 as retweeterId,
                    (SELECT (CASE WHEN COUNT(*) > 0 THEN true ELSE false END) FROM Retweets Rp, Tweets Tp 
                    where Tp.id=Rp.tweetId and Rp.userId={id} and Tp.id=T.id and Rp.deleteFlag=0 and Tp.deleteFlag=0) 
                    as reTweeted from Tweets T, Users U where userId={searchUserId} and U.id=T.userId and U.deleteFlag=0 
                    and T.deleteFlag=0 order by created_at desc;`,

           USERRETWEET : `select distinct(T.id),T.userId,U.name,T.tweet,R.created_at,R.userId as retweeterId,RU.name as retweeter_name,
                    (SELECT (CASE WHEN COUNT(*) > 0 THEN true ELSE false END) FROM Retweets Rp, Tweets Tp 
                    where Tp.id=Rp.tweetId and Rp.userId={id} and Tp.id=T.id and Rp.deleteFlag=0 and Tp.deleteFlag=0) 
                    as reTweeted from Users U,Users RU,Tweets T join Retweets R on T.id=R.tweetId where R.userId={searchUserId} and 
                    RU.id=R.userId and U.id=T.userId and T.deleteFlag=0 and R.deleteFlag=0 and 
                    RU.deleteFlag=0 order by created_at desc;`,

           USERFOLLOW : `select (CASE WHEN COUNT(*) > 0 THEN true ELSE false END) as follow FROM Twitter.FollowList where follower={id} 
                    and following={searchUserId} and deleteFlag=0`,

           SEARCHTWEET : `select T.id,T.userId,U.name,T.tweet,T.created_at,0 as retweeterId,
                    (SELECT (CASE WHEN COUNT(*) > 0 THEN true ELSE false END) FROM Retweets Rp, Tweets Tp 
                    where Tp.id=Rp.tweetId and Rp.userId={userId} and Tp.id=T.id and Rp.deleteFlag=0 and Tp.deleteFlag=0) 
                    as reTweeted from Tweets T, Users U where T.tweet like "%{searchKey}%" and T.deleteFlag=0 and T.userId=U.id`,

           SEARCHUSER : `select U.name,U.id,(SELECT (CASE WHEN COUNT(*) > 0 THEN true ELSE false END) FROM Twitter.FollowList 
                    where follower={userId} and following=U.id and deleteFlag=0) as follow from Users U where name like "%{searchKey}%" 
                    and deleteFlag=0`,

           FOLLOWERS : `select U.name,U.id,(SELECT (CASE WHEN COUNT(*) > 0 THEN true ELSE false END) FROM Twitter.FollowList 
                    where follower={id} and following=U.id and deleteFlag=0) as follow from Users U, FollowList F 
                    where F.following="{userId}" and F.follower=U.id and F.deleteFlag=0`,

           FOLLOWING : `select U.name,U.id,(SELECT (CASE WHEN COUNT(*) > 0 THEN true ELSE false END) FROM Twitter.FollowList 
                    where follower={id} and following=U.id and deleteFlag=0) as follow from Users U, FollowList F 
                    where F.follower={userId} and F.following=U.id and F.deleteFlag=0;`,

           TIME : `select created_at from Users where email = "{email}" and deleteFlag=0`
        },
        DELETE : {
            
        }
    },
    mongo : {
      
    }
};