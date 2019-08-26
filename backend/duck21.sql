use study_forum;

#tables
create table user(
    user_id varchar(20) primary key,
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
    posting_user_id varchar(20) not null,
    posting_time datetime not null ,
    reply_time datetime not null ,
    reply_num int not null,
    theme varchar(256) not null,
    posting_content varchar(16384) not null,
    category_id int not null,
    posting_thumb_num int not null
)



create table reposting(
    reposting_id int primary key auto_increment,
    reply_id int not null,
    main_posting_id int not null,
    reposting_user_id varchar(20) not null,
    reposting_time datetime not null,
    reposting_content varchar(16384) not null ,
    reposting_thumb_num int not null
)


create table notify(
    notify_id int primary key auto_increment,
    notify_user_id varchar(20) not null,
    notify_content varchar(16384),
    notify_time datetime not null,
    notify_status int not null default 0
)


create table category(
    category_id int primary key,
    category_content varchar(16384) not null,
    posting_num int not null,
    reposting_num int not null,
    new_reply_time datetime not null
)

create table administration(
    administration_id int primary key,
    category_id int not null,
    user_id varchar(20) not null
)


#foreign key
alter table posting add foreign key (posting_user_id) references user(user_id);
alter table reposting add foreign key (reposting_user_id) references user(user_id);
alter table reposting add foreign key (main_posting_id) references posting(posting_id);
alter table notify add foreign key (notify_user_id) references user(user_id);
alter table administration add foreign key (category_id) references category(category_id);
alter table administration add foreign key (user_id) references user(user_id);

#triggers


create trigger insertreposting after insert
    on reposting for each row
    begin
        update posting set reply_time=now() where posting_id = new.main_posting_id;
        update posting set reply_num=reply_num+1 where posting_id = new.main_posting_id;
        update category join posting on category.category_id=posting.category_id
        set category.reposting_num = category.reposting_num+1
        where new.main_posting_id=posting_id;
    end;


create trigger updatereposting after update
    on reposting for each row
    begin
        update posting set reply_time=now() where posting_id = new.main_posting_id;
    end;


create trigger deletereposting after delete
    on reposting for each row
    begin
        update posting set reply_num=reply_num-1 where posting_id = old.main_posting_id;
        update category join posting on category.category_id=posting.category_id
        set category.reposting_num = category.reposting_num-1
        where old.main_posting_id=posting_id;
    end;

create trigger insertposting after insert
    on posting for each row
    begin
        update category set posting_num=posting_num+1 where category.category_id = new.category_id;
        update category set new_reply_time = now() where category.category_id = new.category_id;
    end;

create trigger updatposting after update
    on posting for each row
    begin
        update category set new_reply_time = now() where category.category_id = new.category_id;
    end;

create trigger deleteposting after delete
    on posting for each row
    begin
        update category set posting_num=posting_num-1 where category.category_id = old.category_id;
    end;


#测试
select * from user;

select * from reposting;

select * from posting;

select * from category;

insert into reposting (reply_id, main_posting_id, reposting_user_id, reposting_time, reposting_content, reposting_thumb_num)
values (1,3,123456,now(),'你 打 字 没 空 格 啊 11452',0);

delete from reposting where main_posting_id=3;

update reposting set reposting_content='空 格',reposting_time=now() where main_posting_id=3;

insert into category (category_id, category_content, posting_num, reposting_num, new_reply_time)
values (1,'校园周边',123,59,now());


select * from category join posting on category.category_id=posting.category_id;


update user set head = 'https://b-ssl.duitang.com/uploads/item/201805/31/20180531220859_wufxi.jpg';
