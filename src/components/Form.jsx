import { useState } from 'react';
import '../styles/form.scss';
import integerValidation from '../features/integerValidation';
import stringValidation from '../features/stringValidation';
import axios from 'axios';

const Form = () => {
	const houseTypeOptions = [
		{ value: 'Townhome', displayText: 'Townhome' },
		{ value: 'Apartment Complex', displayText: 'Apartment Complex' },
		{ value: 'Condominiums', displayText: 'Condominiums' },
		{
			value: 'Single Family Residence',
			displayText: 'Single Family Residence',
		},
		{
			value: 'Multiple Family Residence',
			displayText: 'Multiple Family Residence',
		},
	];

	const integerStep = 1;
	const stringMinLength = 1;

	const [formData, setFormData] = useState({
		houseId: 0,
		houseName: '',
		houseAddress: {
			streetNumber: 0,
			streetName: '',
			postalCode: 0,
		},
		floorCount: 0,
		price: 0,
		houseType: 'default',
		contactNumber: 0,
		contactEmail: '',
	});

	// list of states that are of type number
	const numTypeArray = [
		'houseId',
		'streetNumber',
		'postalCode',
		'floorCount',
		'price',
		'contactNumber',
	];
	const changeHandler = (e) => {
		const targetId = e.target.id;
		let targetValue = e.target.value;
		if (e.target.id.includes('street') || e.target.id.includes('postal')) {
			if (numTypeArray.some((substring) => targetId.includes(substring))) {
				targetValue = Number(targetValue);
			}
			setFormData({
				...formData,
				houseAddress: {
					...formData.houseAddress,
					[targetId]: targetValue,
				},
			});
			return;
		}
		if (numTypeArray.some((substring) => targetId.includes(substring))) {
			targetValue = Number(targetValue);
		}
		setFormData({ ...formData, [targetId]: targetValue });
	};

	const submitHandler = (e) => {
		e.preventDefault();

		//validations for mandetory fields
		if (!stringValidation({ string: formData.contactEmail })) {
			alert('Invalid email, please try again with a valid email');
			return;
		}
		if (!stringValidation({ string: formData.houseAddress.streetName })) {
			alert('Invalid Street Name, please try again with a valid street name');
			return;
		}
		if (!stringValidation({ string: formData.houseAddress.streetName })) {
			alert('Invalid Street Name, please try again with a valid street name');
			return;
		}
		if (!integerValidation({ integer: formData.houseId })) {
			alert('Invalid House ID, please try again with a valid house id');
			return;
		}
		if (!integerValidation({ integer: formData.houseAddress.streetNumber })) {
			alert(
				'Invalid Street Number, please try again with a valid street number'
			);
			return;
		}
		if (!integerValidation({ integer: formData.houseAddress.postalCode })) {
			alert('Invalid Postal Code, please try again with a valid postal code');
			return;
		}
		if (!integerValidation({ integer: formData.floorCount })) {
			alert(
				'Invalid number of floors, please try again with a valid number of floors'
			);
			return;
		}
		if (!integerValidation({ integer: formData.price })) {
			alert('Invalid Price, please try again with a valid price');
			return;
		}
		if (
			formData.contactNumber < 9000000000 ||
			formData.contactNumber > 9999999999
		) {
			alert(
				'Invalid Contact Number, please try again with a valid 10 digit contact number starting with 9'
			);
			return;
		}
		if (formData.houseType === 'default') {
			alert('Invalid house type, please select a house type');
			return;
		}

		console.log(formData);
		//posting the form to a test site for now
		const url = 'https://jsonplaceholder.typicode.com/posts/';
		axios.post(url, { hosue: formData });
	};
	return (
		<form onSubmit={submitHandler} className='form'>
			<div className='form-element'>
				<input
					id='houseId'
					onChange={changeHandler}
					className='form-input onChange={changeHandler}'
					type='number'
					step={integerStep}
					placeholder='House ID'
					required
				/>
				<label className='form-label' htmlFor='houseId'>
					House ID
				</label>
			</div>

			<div className='form-element'>
				<input
					id='houseName'
					onChange={changeHandler}
					className='form-input onChange={changeHandler}'
					type='text'
					placeholder='House Name'
					minLength={stringMinLength}
				/>
				<label className='form-label' htmlFor='houseName'>
					House Name
				</label>
			</div>

			<div className='form-element'>
				<input
					id='streetNumber'
					onChange={changeHandler}
					className='form-input onChange={changeHandler}'
					type='number'
					step={integerStep}
					placeholder='Street Number'
					required
				/>
				<label className='form-label' htmlFor='streetNumber'>
					Street Number
				</label>
			</div>

			<div className='form-element'>
				<input
					id='streetName'
					onChange={changeHandler}
					className='form-input onChange={changeHandler}'
					type='text'
					placeholder='Street Name'
					minLength={stringMinLength}
					required
				/>
				<label className='form-label' htmlFor='streetName'>
					Street Name
				</label>
			</div>

			<div className='form-element'>
				<input
					id='postalCode'
					onChange={changeHandler}
					className='form-input onChange={changeHandler}'
					type='text'
					placeholder='Postal Code'
					required
				/>
				<label className='form-label' htmlFor='postalCode'>
					Postal Code
				</label>
			</div>

			<div className='form-element'>
				<input
					id='floorCount'
					onChange={changeHandler}
					className='form-input onChange={changeHandler}'
					type='number'
					step={integerStep}
					placeholder='Number of Floors'
					required
				/>
				<label className='form-label' htmlFor='floorCount'>
					Number of Floors
				</label>
			</div>

			<div className='form-element'>
				<input
					id='price'
					onChange={changeHandler}
					className='form-input onChange={changeHandler}'
					type='number'
					placeholder='Price of the House'
					required
				/>
				<label className='form-label' htmlFor='price'>
					Price of the House
				</label>
			</div>

			<div className='form-element'>
				<input
					id='contactNumber'
					onChange={changeHandler}
					className='form-input onChange={changeHandler}'
					type='number'
					placeholder='Contact Number'
					pattern='[9][0-9]{9}'
					title='Ten digit number starting with nine'
					required
				/>
				<label className='form-label' htmlFor='contactNumber'>
					Contact Number
				</label>
			</div>

			<div className='form-element'>
				<input
					id='contactEmail'
					onChange={changeHandler}
					className='form-input onChange={changeHandler}'
					type='email'
					placeholder='Contact Email'
					required
				/>
				<label className='form-label' htmlFor='contactEmail'>
					Contact Email
				</label>
			</div>

			<div className='form-element'>
				<select
					className='form-input onChange={changeHandler}'
					id='houseType'
					required
					onChange={changeHandler}>
					<option value='default' disabled selected>
						Select House Type
					</option>
					{houseTypeOptions.map((houseOption, index) => (
						<option value={houseOption.value} key={index}>
							{houseOption.displayText}
						</option>
					))}
				</select>
				<label className='form-label' htmlFor='houseType'>
					Type of House
				</label>
			</div>

			<div className='form-element'>
				<button type='submit' className='submit-button'>
					Submit
				</button>
			</div>
		</form>
	);
};

export default Form;
