/* eslint-disable n/no-deprecated-api */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
const { Base64 } = require('js-base64')
const crypto = require('crypto')

const codeRed = async model => {
  /** variables necesarias */
  let result = ''; const error = false
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  /** creación de código */
  for (let i = 0; i < 10; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  /** busca si ya existe */
  const dataUP = await model.findOne({ attributes: ['up_id'], where: { up_code: result } })
  /** verifica si existe */
  if (dataUP) { await codeRed() } else { return result }
}

const SECRET_KEY = process.env.ID_DECODE_KEY

const enCode = value => {
  try {
    if (value) {
      const cipher = crypto.createCipher('aes-256-cbc', Buffer.from(SECRET_KEY, 'hex'))
      let encrypted = cipher.update(value.toString(), 'utf-8', 'hex')
      encrypted += cipher.final('hex')

      const uuid = [
        encrypted.substr(0, 8),
        encrypted.substr(8, 4),
        encrypted.substr(12, 4),
        encrypted.substr(16, 4),
        encrypted.substr(20)
      ].join('-')

      return uuid
    }
  } catch (error) {
    return ''
  }
}

const deCode = uuidValue => {
  try {
    if (!uuidValue) return ''

    if (typeof uuidValue !== 'string') {
      uuidValue = uuidValue.toString()
    }

    const encryptedHex = uuidValue.replace(/-/g, '')
    const decipher = crypto.createDecipher('aes-256-cbc', Buffer.from(SECRET_KEY, 'hex'))
    let decrypted = decipher.update(encryptedHex, 'hex', 'utf-8') // Cambia 'hex' a 'utf-8'
    decrypted += decipher.final('utf-8') // Cambia 'hex' a 'utf-8'

    return parseInt(decrypted, 10)
  } catch (error) {
    return ''
  }
}


const linkBelongsTo = (modelOne, modelTwo, target, foreign) => {
  return modelOne.belongsTo(modelTwo, {
    targetKey: target,
    foreignKey: foreign
  })
}

const linkHasMany = (modelOne, modelTwo, target, foreign) => {
  return modelOne.hasMany(modelTwo, {
    targetKey: target,
    foreignKey: foreign
  })
}

const consecutive = value => {
  let consecutive = parseInt(value) + 1
  consecutive = `${consecutive}`
  if (consecutive.length === 4) { consecutive = `00${consecutive}` } else if (consecutive.length === 5) { consecutive = `0${consecutive}` }
  return consecutive
}

const UpCrNotFind = async (model, newItem, where, condition, updateFind = false) => {
  /** confirma si hay id para actualizar o registrar */
  if (condition) {
    const data = await model.update(newItem, { where: where || { [condition.id]: deCode(condition.value) } })
    if (!!data[0] && !!updateFind) { return await model.findOne({ where: where || { [condition.id]: deCode(condition.value) } }) }
    return where || { [condition.id]: condition.value }
  } return await model.create(newItem)
}

const UpCrFind = async (model, newItem, where, condition, updateFind = false) => {
  const res = await model.findOne({ where: where || { [condition.id]: deCode(condition.value) } })
  /** confirma si hay id para actualizar o registrar */
  if (res) {
    await model.update(newItem, { where: where || { [condition.id]: deCode(condition.value) } })
    return res
  } return await model.create(newItem)
}

const updateOrCreate = async (model, newItem, where) => {
  /** busca si existe */
  const result = await model.findOne({ where })
  /** confirma si existe para actualizar o registrar */
  if (result) {
    const data = await model.update(newItem, { where })
    if (data[0] !== 0) { return await model.findOne({ where }) }
    return result
  } return await model.create(newItem)
}

// Busca los campos que coinciden con la base de datos y la query de graphql
const getAttributes = (model, { fieldNodes }) => {
  // get the fields of the Model (columns of the table)
  const columns = new Set(Object.keys(model.rawAttributes))
  const requestedAttributes = fieldNodes[0].selectionSet.selections
    .map(({ name: { value } }) => { return value })
    // filter the attributes against the columns
  return requestedAttributes.filter(attribute => { return columns.has(attribute) })
}
/**
 * Verifica que contenga un valor
 * @version 0.0.1
 * @param {*} value valor
 * @return {boolean} true o false
 */
const isNull = value => {
  if (!!value || value === 0) return false
  return true
}
const validationID = (value, typeNull = true) => {
  try {
    if (typeNull && isNull(value) && isNaN(Base64.decode(value))) throw new Error('No es una codificación valida.')
    else if (!typeNull && isNaN(value ? Base64.decode(value) : 0)) throw new Error('No es una codificación valida')
    return value ? deCode(value) : null
  } catch (error) {
    throw new Error('No es una codificación valida.')
  }
}

/**
 *
 * @param {Object} data objeto a filtrar
 * @param {Array} filters array a comparar o claves del objeto
 * @return {Object} devuelve un objeto con los datos filtrados
 */
const filterKeyObject = (data, filters) => {
  let values = {}
  for (const elem in data) {
    let coincidence = false
    for (let i = 0; i < filters.length; i++) if (elem === filters[i]) coincidence = true

    if (!coincidence) values = { ...values, [elem]: data[elem] }
  }

  return values
}
/**
 * valida los inputs
 * @version 0.0.1
 * @param {*} data valor
 * @param {boolean} typeNull null
 * @param {boolean} typeRange rango
 * @param {number} minRange minimo de rango
 * @param {number} maxRange maximo de rango
 * @param {boolean} typeLetters letras
 * @param {boolean} typeNumeric numerico
 * @param {boolean} typeEmail correo electronico
 * @param {boolean} typeFormat formato numerico
 * @return {boolean} true o false
 */

/**
 * Verifica que sea numeros
 * @version 0.0.1
 * @param {*} value valor
 * @return {boolean} true o false
 */
const isNumeric = value => {
  if (!isNaN(value)) return false
  return true
}

/**
 * Verifica que sea letras
 * @version 0.0.1
 * @param {*} value valor
 * @return {boolean} true o false
 */
const onlyLetters = value => {
  const validation = /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/g
  if (validation.test(value) || value.length === 0) return false
  return true
}

/**
 * Verifica que sea un correo electrónico
 * @version 0.0.1
 * @param {*} value valor
 * @return {boolean} true o false
 */
const isEmail = value => {
  const validation = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
  if (validation.test(value) || value.length === 0) return false
  return true
}
/**
 * Verifica que se encuentre en la cantidad del rango de caracteres
 * @version 0.0.1
 * @param {*} data valor
 * @param {*} min minimo
 * @param {*} max maximo
 * @return {boolean} true o false
 */
const rangeLength = (data, min, max) => {
  const value = `${data}`
  if (((value.length >= min) && (value.length <= max)) || value.length === 0) return false
  return true
}

const validations = (data, typeNull, typeRange, minRange, maxRange, typeLetters, typeNumeric, typeEmail, typeFormat) => {
  const value = typeFormat ? data?.replace(/\./g, '') : data
  /** verifica que campos seran y si se encuentra la condicion o no */
  if (typeNull) {
    if (isNull(value)) throw new Error('Campo requerido.')
  }
  if (typeNumeric) {
    if (isNumeric(value)) throw new Error('Solo puede contener números.')
  }
  if (typeLetters) {
    if (onlyLetters(value)) throw new Error('Solo puede contener letras.')
  }
  if (typeEmail) {
    if (isEmail(value)) throw new Error('No es un formato de email valido.')
  }
  if (typeRange) {
    if (rangeLength(value, minRange, maxRange)) throw new Error(`El rango de caracteres es de ${minRange} a ${maxRange}.`)
  }
  return false
}

module.exports = {
  enCode,
  deCode,
  consecutive,
  codeRed,
  // pushNotifications,
  UpCrNotFind,
  UpCrFind,
  linkBelongsTo,
  linkHasMany,
  updateOrCreate,
  getAttributes,
  validationID,
  validations,
  filterKeyObject
}
