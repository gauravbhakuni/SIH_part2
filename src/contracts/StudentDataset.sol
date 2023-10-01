// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract StudentDataset {
    struct Student {
        uint256 studentId;
        string name;
        uint256[] cids;
    }

    mapping(uint256 => Student) public students;
    uint256 public studentCount;

    constructor() {
        studentCount = 0;
    }

    function registerStudent(uint256 _studentId, string memory _name) public {
        students[_studentId] = Student(_studentId, _name, new uint256[](0));
        studentCount++;
    }

    function addCourse(uint256 _studentId, uint256 _cid) public {
        require(students[_studentId].studentId != 0, "Student does not exist");
        students[_studentId].cids.push(_cid);
    }

    function getCourseIds(uint256 _studentId) public view returns (uint256[] memory) {
        return students[_studentId].cids;
    }
}
