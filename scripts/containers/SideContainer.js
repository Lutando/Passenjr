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
                        <div className='summary'>
                        </div>
                    </Card>

                    <Card background='#3f4f67'>
                        <div className='summary'>
                        </div>
                    </Card>

                    <Card background='#5f5f5f'>
                        <div className='summary'>
                        </div>
                    </Card>
                    <Card background='#1f1f1f'>
                        <div className='summary'>
                        </div>
                    </Card>
                </CardStack>
            </div>
        );
    }
}

export default SideContainer;