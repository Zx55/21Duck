import React, { useState } from 'react';

import BannerAnim from 'rc-banner-anim';
import QueueAnim from 'rc-queue-anim';
import { TweenOneGroup } from 'rc-tween-one';
import { Icon } from 'antd';

import './Banner.css';


const Element = BannerAnim.Element;

const textData = {
    content: '21 Duck来源于 1721谐音“一起二鸭”, 是1721大班的代称,' +
        ' 而21Duck论坛是一个最初面向1721大班学生所搭建的网络平台, ' +
        '在平台上大家可以进行相关活动宣传,兴趣探讨以及一起刷题 ' +
        '这个平台灵感来自另一个知识讨论论坛-知乎, ' +
        '希望通过这个平台, 能够让1721的同学更好的于平台交流学习 ' +
        '114514 1919810',
    title: '21 Duck故事',
};

let dataArray = [{
        pic: 'https://i.loli.net/2019/08/31/DaezLfys16lboOt.png',
        map: 'https://i.loli.net/2019/08/31/YqcUdO8po2ZiuwC.png',
        color: '#FFF43D',
        background: '#F6B429',
        content: '',
        title: '',
    }, {
        pic: 'https://i.loli.net/2019/08/31/EX14xZ95IgROFL7.png',
        map: '',
        color: '#EB4334',
        background: '#EB4334',
        content: '',
        title: '',
    }, {
        pic: 'https://i.loli.net/2019/08/31/xwWbosAkQgY9deN.png',
        map: '',
        color: '#35AA53',
        background: '#35AA53',
        content: '',
        title: '',
    },
];
dataArray = dataArray.map(item => ({ ...item, ...textData }));

export interface BannerProps {
    className: string;
}

export default (props: BannerProps) => {
    const [showInt, setShowInt] = useState(0);
    const [delay, setDelay] = useState(0);
    const [imgAnim, setImgAnim] = useState([{
            translateX: [0, 300],
            opacity: [1, 0]
        }, {
            translateX: [0, -300],
            opacity: [1, 0]
        },
    ]);

    let oneEnter = false;
    let bannerImg: any;
    let bannerText: any;

    const onChange = () => {
        if (!oneEnter) {
            setDelay(300);
            oneEnter = true;
        }
    };

    const onLeft = (): void => {
        const imgAnim = [{
            translateX: [0, -300],
            opacity: [1, 0]
        }, {
            translateX: [0, 300],
            opacity: [1, 0]
        },];

        let tempShowInt = showInt;
        tempShowInt -= 1;
        if (tempShowInt <= 0) {
            setShowInt(0);
        }

        setImgAnim(imgAnim);
        setShowInt(tempShowInt);
        bannerImg.prev();
        bannerText.prev();
    };

    const onRight = (): void => {
        const imgAnim = [{
            translateX: [0, 300],
            opacity: [1, 0]
        }, {
            translateX: [0, -300],
            opacity: [1, 0]
        },];

        let tempShowInt = showInt;
        tempShowInt += 1;
        if (tempShowInt > dataArray.length - 1) {
            setShowInt(dataArray.length - 1);
        }

        setImgAnim(imgAnim);
        setShowInt(tempShowInt);
        bannerImg.next();
        bannerText.next();
    };

    const getDuration = (e: { key: string; }) => {
        if (e.key === 'map') {
            return 800;
        }
        return 1000;
    };

    const imgChildren = dataArray.map((item, i) => (
        <Element
            key={i}
            style={{
                background: item.color,
                height: '100%',
            }}
            leaveChildHide
        >
            <QueueAnim
                animConfig={imgAnim}
                duration={getDuration}
                delay={[!i ? delay : 300, 0]}
                ease={['easeOutCubic', 'easeInQuad']}
                key="img-wrapper"
            >
                <div className={`${props.className}-map map${i}`} key="map">
                    <img src={item.map} width="100%" alt='' />
                </div>
                <div className={`${props.className}-pic pic${i}`} key="pic">
                    <img src={item.pic} width="100%" alt='' />
                </div>
            </QueueAnim>
        </Element>));

    const textChildren = dataArray.map((item, i) => {
        const { title, content, background } = item;
        return (<Element key={i}>
            <QueueAnim type="bottom" duration={1000} delay={[!i ? delay + 500 : 800, 0]}>
                <h1 key="h1">{title}</h1>
                <em key="em" style={{ background }} />
                <p key="p">{content}</p>
            </QueueAnim>
        </Element>);
    });

    return (
        <div
            className={`${props.className}-wrapper`}
            style={{ background: dataArray[showInt].background }}
        >
            <div className={props.className}>
                <BannerAnim
                    prefixCls={`${props.className}-img-wrapper`}
                    sync
                    type="across"
                    duration={1000}
                    ease="easeInOutExpo"
                    arrow={false}
                    thumb={false}
                    ref={(c: any) => { bannerImg = c; }}
                    onChange={onChange}
                    dragPlay={false}
                >
                    {imgChildren}
                </BannerAnim>
                <BannerAnim
                    prefixCls={`${props.className}-text-wrapper`}
                    sync
                    type="across"
                    duration={1000}
                    arrow={false}
                    thumb={false}
                    ease="easeInOutExpo"
                    ref={(c: any) => { bannerText = c; }}
                    dragPlay={false}
                >
                    {textChildren}
                </BannerAnim>
                <TweenOneGroup enter={{ opacity: 0, type: 'from' }} leave={{ opacity: 0 }}>
                    {showInt && <Icon type="left" key="left" onClick={onLeft} />}
                    {showInt < dataArray.length - 1 && <Icon type="right" key="right" onClick={onRight} />}
                </TweenOneGroup>
            </div>
        </div>
    );
};
