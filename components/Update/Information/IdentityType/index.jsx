/* eslint-disable no-unused-vars */
import { useMutation, useQuery } from '@apollo/client'
import { useState } from 'react'
import { PColor } from '../../../../assets/colors'
import {
  IconDelete,
  IconDost,
  IconEdit
} from '../../../../assets/icons/icons'
import { GET_IDENTITY, UPDATE_IDENTITY } from '../../../../gql/information/IdentityType'
import { validationSubmitHooks } from '../../../../utils'
import InputHooks from '../../../InputHooks/InputHooks'
import { RippleButton } from '../../../Ripple'
import {
  Container,
  Form,
  ContainerTask,
  OptionsFunction,
  Button,
  ListTask
} from './styled'

export const IdentityType = () => {
  const [values, setValues] = useState({})
  const [errors, setErrors] = useState({})
  const [createTypeIdentity] = useMutation(UPDATE_IDENTITY)
  const handleChange = (e, error) => {
    setValues({ ...values, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: error })
  }
  const [show, setShow] = useState(false)

  // Mutación para subir un país
  const { data } = useQuery(GET_IDENTITY)
  const handleSubmit = e => {
    e.preventDefault()
    // Declarando variables
    let errorSubmit = false
    for (const x in errors) {
      if (errors[x]) errorSubmit = true
    }
    // Validando todos los campos que no sean nulos
    const errorForm = validationSubmitHooks(e.target.elements)
    for (const x in errorForm) {
      if (errorForm[x]) errorSubmit = true
    }
    setErrors({ ...errorForm })
    if (errorSubmit) {
      // setAlertBox({ message: 'Por favor, verifique que los Campos estén correctos', duration: 5000 })
    }
    if (!errorSubmit) {
      createTypeIdentity({
        variables: { input: { tiName: values.tiName } },
        update (cache) {
          cache.modify({
            fields: {
              typeIdentities (dataOld = []) {
                return cache.writeQuery({ query: GET_IDENTITY, data: dataOld })
              }
            }
          })
        }
      })
    }
    return (<>
      <Container>
        <Form onSubmit={handleSubmit}>
          <InputHooks
            errors={values?.tiName}
            name='tiName'
            onChange={handleChange}
            required
            title='Ingresa un tipo de identidad'
            value={values?.tiName}
          />
          <RippleButton label='Tipo de identidad' type={'submit'} />
        </Form>
        <div>
          {data?.typeIdentities?.map(x => {
            return (<div key={x?.tiId}>
              <ContainerTask show={show === x}>
                <OptionsFunction show={show === x}>
                  <Button><IconDelete color={PColor} size={30} /></Button>
                  <Button><IconEdit size={30} /></Button>
                </OptionsFunction>
                <ListTask show={show === x}>
                  {x.tiName}
                </ListTask>
                <div style={{ display: 'contents' }}><Button onClick={() => { return setShow(x === show ? false : x) }}><IconDost color={show === x ? PColor : '#CCC'} size={30} /></Button></div>
              </ContainerTask>

            </div>)
          })}

        </div>
      </Container>
    </>
    )
  }
}
