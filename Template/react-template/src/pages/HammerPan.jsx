import React from 'react';

class HammerPan extends React.Component {
    render() {
        return <div className="myElement">888</div>;
    }

    componentDidMount() {
        const myElement = document.querySelector('.myElement');
        // create a simple instance
        // by default, it only adds horizontal recognizers
        const mc = new Hammer(myElement);

        // let the pan gesture support all directions.
        // this will block the vertical scrolling on a touch-device while on the element
        mc.get('pan').set({ direction: Hammer.DIRECTION_ALL });

        // listen to events...
        mc.on('panleft panright panup pandown tap press', ev => {
            myElement.textContent = ev.type + ' gesture detected.';
        });
    }
}

export default HammerPan;
