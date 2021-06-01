import React from "react";
import { useState, useEffect } from "react";
import InputFrom from "../common/Input";


const ViewUserInfoForm = (props) => {
	const [data, setData] = useState(props.userData);

	useEffect(() => {
    console.log("Getting")
		setData(props.userData)
	},[props.userData]);

	return (
		<>
			<div className='mb-4'>
				{" "}
				<div key={data.username}>
					<InputFrom
          disabled={true}
						name={"username"}
						label={"Username"}
						type={"text"}
						variant={"filled"}
						autoFocus={true}
						defaultValue={data.username || "Username Not Set"}
					/>
				</div>
			</div>
			<div className='row mb-4'>
				<div className='col-md-12'>
					<div key={data.email}>
						<InputFrom disabled={true} name={"email"} label={"Email"} type={"text"} variant={"filled"} autoFocus={true} defaultValue={data.email || ""} />
					</div>
				</div>
			</div>
			<div className='row mb-4'>
				<div className='col-md-6'>
					<div key={data.firstname}>
						<InputFrom
            disabled={true}
							name={"firstname"}
							label={"First Name"}
							type={"text"}
							variant={"filled"}
							autoFocus={true}
							defaultValue={data.firstname || ""}
						/>
					</div>
				</div>

				<div className='col-md-6'>
					<div key={data.lastname}>
						<InputFrom
            disabled={true}
							name={"lastname"}
							label={"Last Name"}
							type={"text"}
							variant={"filled"}
							autoFocus={true}
							defaultValue={data.lastname || ""}
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default ViewUserInfoForm;

