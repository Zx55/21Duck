use study_forum;

#tables
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
    posting_id int primary key auto_increment,
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
    notify_status int not null default 0
)

#foreign key
alter table posting add foreign key (posting_user_id) references user(user_id);
alter table reposting add foreign key (reposting_user_id) references user(user_id);
alter table reposting add foreign key (main_posting_id) references posting(posting_id);
alter table notify add foreign key (notify_user_id) references user(user_id);


#triggers
create trigger insertreposting after insert
    on reposting for each row
    begin
        update posting set reply_time=now() where posting_id = new.main_posting_id;
        update posting set reply_num=reply_num+1 where posting_id = new.main_posting_id;
    end;

create trigger updatreposting after update
    on reposting for each row
    begin
        update posting set reply_time=now() where posting_id = new.main_posting_id;
    end;

create trigger deletereposting after delete
    on reposting for each row
    begin
        update posting set reply_num=reply_num-1 where posting_id = old.main_posting_id;
    end;

#测试
select * from reposting;

select * from posting;

insert into reposting (reply_id, main_posting_id, reposting_user_id, repostring_time, reposting_content, reposting_thumb_num)
values (1,1,123456,now(),'你 打 字 没 空 格 ？',0);

delete from reposting where main_posting_id=1;

update reposting set reposting_content='空 格？' where main_posting_id=1;


