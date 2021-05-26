import React, { useRef } from 'react';
import { Card, Button, Form } from 'react-bootstrap'
const Signup =() => {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmationRef = useRef()

    return (<React.Fragment>
        <Card>
            <Card.body>
                <h2 className="text-center mb-4"> Sign Up</h2>
                <Form>
                    <Form.Group id="email">
                        <Form.Label> Email</Form.Label>
                        <Form.Control type="email" ref={emailRef} required />
                    </Form.Group>
                    <Form.Group id="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" ref={passwordRef} required />
                    </Form.Group>
                    <Form.Group id="passwordConfirm">
                        <Form.Label>Password Confirmation</Form.Label>
                        <Form.Control type="password" ref={passwordConfirmationRef} required />
                    </Form.Group>
                    <Button type="submit" />
                </Form>
            </Card.body>

        </Card>
        <div className="w-100 te2xt-center mt-2">
            Already have an account? Log In
        </div>
    </React.Fragment>);
}


export default Signup;

