import React,{ useState, useContext, useRef} from 'react';
import { Button, Form, Alert} from 'react-bootstrap'
import { MyContext } from '../context'; 

const Stage1 = () => {

    const textInput = useRef()
    const context = useContext(MyContext)
    const [error, setError] = useState([false, ''])

    const handleSubmit = (e) => {
        e.preventDefault();
        const value = textInput.current.value;
        const validate = validateInput(value);

        if(validate){ // Validate is true, add player
            setError([false,''])
            context.addPlayer(value)
            textInput.current.value = ""
        }
    }

    const validateInput = (value) => {

        if (value === ''){ // Empty? 
            setError([true, "Sorry, fill in the name!"])
            return false
        }
        if(value.length <= 2) // Shorter then 3?
        {
            setError([true, "That name's too short!"])
            return false
        }
        return true;
    }

    console.log(context.state)

    return(
        <>
            <Form onSubmit={handleSubmit} className="mt-4">
                <Form.Group>
                    <Form.Control 
                        type='text'
                        placeholder='Add player name'
                        name='player'
                        ref={textInput}
                        />
                </Form.Group>

                { error[0] ? // Error[0] : if the error is true. set to error[1] the message
                    <Alert> 
                        {error[1]} 
                    </Alert>
                :null}

                <Button className='miami' variant='primary' type='submit'>
                    Add player
                </Button>
                { context.state.players && context.state.players.length > 0 ?
                <>
                <hr/>
                <div>
                    <ul className='list-group'>
                        {   context.state.players.map((player,idx)=>(
                            <li key={idx} className="list-group-item d-flex
                            justify-content-between align-items-center
                            list-group-item-action">
                                {player}
                                <span
                                    className='badge badge-danger'
                                    onClick={()=> context.removePlayer(idx)}
                                >
                                    X
                                </span>
                            </li>
                        ))

                        }
                    </ul>
                    <div
                        className='action_button'
                        onClick={()=> context.next()}
                    >
                        NEXT
                    </div>
                </div>
                </>        
                :null}
            </Form>
        </>
    )

}

export default Stage1;