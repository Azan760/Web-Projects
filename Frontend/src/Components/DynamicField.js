import React, { memo, useState, useEffect } from 'react'
import Button from './Button'
import { done, plus, plus1, trash } from './Icons'
import InputField from './InputField';
import SelectOptions from './SelectOptions';

const DynamicField = ({ setValue, watch, fieldName, fieldConfig, register, errors, remove, fields, append }) => {

    const calculatedValues = (index) => {
        const purchasePrice = watch(`${fieldName}.${index}.purchasePrice`);
        const salesPrice = watch(`${fieldName}.${index}.salePrice`);
        const profit = purchasePrice > 0 && salesPrice > 0 ?
            Math.round(((salesPrice - purchasePrice) * 100) / purchasePrice) : undefined;

        return { profit };
    };


    return (
        <>

            <div className='flex flex-col mb-2.5'>

                <p className='text-base text-textColor font-semibold 
                                tracking-wider'> {fieldConfig[0].title} </p>
            </div>
            <div className='xsm:overflow-x-auto '>

                <table style={{ boxShadow: '0 0 6px #172b4d0a' }} className=' bg-white rounded border-collapse w-full '>
                    <thead className='bg-darkBlue '>

                        <tr className=''>
                            {fieldConfig[0].heading.map((head, index) => {
                                return (
                                    <th key={index} className='text-left p-2.5 text-xs text-white font-semibold'>
                                        {head} </th>)
                            }
                            )}
                        </tr>


                    </thead>
                    <tbody className='rounded border-searchIcon border box-border'>
                        {fields.length === 0 && (
                            <tr className=''>
                                <td style={{ height: '200px' }} className='text-center p-2.5' colSpan={10}>
                                    <h4 className=' tracking wider text-heading font-semibold text-2xl'> {fieldConfig[0].bodyTitle} </h4>
                                    <p className='mb-7 mt-1 text-sm text-textColor2'> {fieldConfig[0].description} </p>

                                    <Button

                                        type="button" icon={plus1} label={fieldConfig[0].buttonLabel}
                                        className='font-semibold  inline-block bg-textColor text-white '
                                        onClick={append} disabled={fieldConfig[0].disabled}
                                    />

                                </td>

                            </tr>)}

                        {console.log(fields)}
                        {fields.map((field, index) => {
                            const { profit } = calculatedValues(index);

                            return (
                                <tr key={field.id}>


                                    {fieldConfig[0].inputs.map((inputFiled, index2) => {
                                        return (
                                            <td key={index2} className='p-2.5' >
                                                <div className='flex '>

                                                    {inputFiled.isSelect ?

                                                        (
                                                            <SelectOptions

                                                                field={{
                                                                    ...inputFiled,
                                                                    inputName: `${fieldName}[${index}].${inputFiled.inputName}`,
                                                                }}

                                                                setValue={setValue} register={register}
                                                                errors={errors} />)
                                                        :

                                                        (

                                                            <input type={inputFiled.type} placeholder={inputFiled.placeholder}
                                                                value={
                                                                    inputFiled.inputName === 'profit'
                                                                        ? profit
                                                                        : undefined
                                                                }

                                                                className={`w-full outline-none py-2 px-2  rounded
                                                         text-xs text-textColor2     font-normal border bg-white 
                                                         ${errors[inputFiled.inputName] ? 'focus:border-reds' : 'focus:border-textColor'}
                                                                                  
                                                        `}
                                                                {...register(`${fieldName}.${index}.${inputFiled.inputName}`)}

                                                            />)}
                                                </div>

                                                {errors[`${fieldName}.${index}.${inputFiled.inputName}`] &&
                                                    <div className='flexs  items-center'>
                                                        <small className='text-reds  text-xs font-medium '>
                                                            {errors[`${fieldName}.${index}.${inputFiled.inputName}`].message}                                                            </small>
                                                    </div>}

                                            </td>

                                        )


                                    })}

                                    <td key={index} className="p-2.5">
                                        <div className="flex gap-2.5 justify-center items-center">

                                            {index === fields.length - 1 && (
                                                <Button
                                                    type="button"
                                                    className=" bg-textColor text-white font-semibold "
                                                    onClick={append} span={'hidden'} icon={plus}
                                                />)}

                                            <Button
                                                type="button" className="font-semibold bg-reds"
                                                onClick={() => remove(index)}
                                                span={'hidden'} icon={trash}
                                            />

                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>

        </>

    )
}

export default DynamicField

