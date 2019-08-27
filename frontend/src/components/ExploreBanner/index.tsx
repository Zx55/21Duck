import React, { useState } from 'react';

import BannerAnim from 'rc-banner-anim';
import QueueAnim from 'rc-queue-anim';
import { TweenOneGroup } from 'rc-tween-one';
import { Icon } from 'antd';

import './Banner.css';


const Element = BannerAnim.Element;

const textData = {
    content: 'Taiwan called motorcycle, motor bike [1] or a motorcycle,' +
        ' the motorcycle referred to in the mainland, ' +
        'Hong Kong and Southeast Asia known as motorcycles [2], ' +
        'is a driven by the engine, ' +
        'operated by a hand or two directions three-wheeled vehicles, is a means of transport. ' +
        'In some military or police applications, will add a side compartment and a secondary wheel, ' +
        'become a special three-wheeled motorcycle, mobility Zheyi common plug-in auxiliary wheels.',
    title: 'Motorcycle',
};

let dataArray = [{
        pic: 'https://zos.alipayobjects.com/rmsportal/ogXcvssYXpECqKG.png',
        map: 'https://zos.alipayobjects.com/rmsportal/HfBaRfhTkeXFwHJ.png',
        color: '#FFF43D',
        background: '#F6B429',
        content: '',
        title: '',
    }, {
        pic: 'https://zos.alipayobjects.com/rmsportal/iCVhrDRFOAJnJgy.png',
        map: 'https://zos.alipayobjects.com/rmsportal/XRfQxYENhzbfZXt.png',
        color: '#FF4058',
        background: '#FC1E4F',
        content: '',
        title: '',
    }, {
        pic: 'https://zos.alipayobjects.com/rmsportal/zMswSbPBiQKvARY.png',
        map: 'https://zos.alipayobjects.com/rmsportal/syuaaBOvttVcNks.png',
        color: '#9FDA7F',
        background: '#64D487',
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
