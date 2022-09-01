const stringValidation = ({ string }) => {
	if (string.trim().length === 0) {
		return false;
	}
	return true;
};

export default stringValidation;
