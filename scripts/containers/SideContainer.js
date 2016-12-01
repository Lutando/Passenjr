import React, { Component, PropTypes } from 'react';
import { CardStack, Card } from 'react-cardstack';

class SideContainer extends Component {
    render() {
        return (
            <div className='side-container'>
                <CardStack className='card-stack'
    height={500}
    width={400}
    hoverOffset={25}>

    <Card background='#162834' className='test'>
        <h1>Number 1</h1>
    </Card>

    <Card background='#3f4f67'>
        <h1>Number 2</h1>
    </Card>

    <Card background='#5f5f5f'>
        <h1>Number 3</h1>
    </Card>

</CardStack>
            </div>
        );
    }
}

export default SideContainer;