import {
    SubjectsModel,
    LMSModel,
    TeachersModel,
    PupilsModel,
    GroupsModel,
    GradesbooksModel
} from './school';

const teacherSchema = {
    name: {
        first: 'niko',
        last: 'nagervadze'
    },
    image: "qwertyasdf",
    dateOfBirth: '02-05-1998',
    emails: [{
        email: 'nikonager@gmail.com',
        primary: true
    }],
    phones: [{
        phone: '59559559550659',
        primary: false
    }],
    sex: 'male',
    subjects: [{
        subject: 'Geography'
    }],
    description: 'string'
};

const pupilSchema = {
    name: {
        first: 'niko',
        last: 'nagervadze'
    },
    image: "qwertyasdf",
    dateOfBirth: '02-05-1998',
    phones: [{
        phone: '59559559550659',
        primary: false
    }],
    sex: 'male',
    description: 'string'
};

const pupilSchema2 = {
    name: {
        first: 'niko',
        last: 'nagervadze'
    },
    phones: [{
        phone: '59559559550651',
        primary: false
    }, {
        phone: '59559559550652',
        primary: true
    }],
    sex: 'male',
    description: 'string'
};

(async () => {
    const physics = new SubjectsModel({
        title: 'Physics',
        lessons: 24,
        description: '123'
    });
    const maths = new SubjectsModel({
        title: 'Maths',
        lessons: 24,
        description: '123'
    });

    const LMS = new LMSModel();
    await LMS.add(physics);
    await LMS.add(maths);
    const teacher = new TeachersModel();
    const teacherID = await teacher.add(teacherSchema);

    const pupil = new PupilsModel();
    const pupulId = await pupil.add(pupilSchema);
    const updatePupil = await pupil.update(pupulId, pupilSchema2)
    console.log(await pupil.read(pupulId));

    const pupulId2 = await pupil.add(pupilSchema);

    const group = new GroupsModel(pupil);
    const groupID = await group.add(236);
    await group.addPupil(groupID, pupulId);

    const level = 1;
    const grade = await new GradesbooksModel(group, teacher, LMS);
    const gradebook = await grade.add(level, groupID);

    const record = {
        pupilId: pupulId,
        teacherId: teacherID,
        subjectId: physics,
        lesson: 1,
        mark: 7
    };
    const record2 = {
        pupilId: pupulId,
        teacherId: teacherID,
        subjectId: maths,
        lesson: 2,
        mark: 6
    };
    const record3 = {
        pupilId: pupulId2,
        teacherId: teacherID,
        subjectId: maths,
        lesson: 2,
        mark: 6
    };

    await grade.addRecord(gradebook, record);
    await grade.addRecord(gradebook, record2);
    await grade.addRecord(gradebook, record3);

    const oliver = await grade.read(gradebook, pupulId);
    const all = await grade.readAll(gradebook);
    console.log(oliver);
})()