use study_forum;


create table user(
    user_id int primary key,
    password varchar(256) not null,
    nickname varchar(64) not null,
    age int,
    school varchar(128),
    head varchar(128),
    profile varchar(256),
    identify int not null,
    blocktime int not null,
    scores int not null default 0,
    register int
)

create table posting(
    postingid int primary key auto_increment,
    posting_user_id int not null,
    posting_time datetime not null ,
    reply_time datetime not null ,
    reply_num int not null,
    theme varchar(256) not null,
    posting_content varchar(16384) not null,
    category varchar(256) not null,
    posting_thumb_num int not null
)

create table reposting(
    reposting_id int primary key auto_increment,
    reply_id int not null,
    main_posting_id int not null,
    reposting_user_id int not null,
    repostring_time datetime not null,
    reposting_content varchar(16384) not null ,
    reposting_thumb_num int not null
)


create table notify(
    notify_id int primary key auto_increment,
    notify_user_id int not null,
    notify_content varchar(16384),
    notify_time datetime not null,
    notify_status varchar(256)
)
