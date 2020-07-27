package com.sportapp.demo.services.sportdata;

import com.sportapp.demo.models.sportdata.EventSoccer;
import com.sportapp.demo.repo.EventSoccerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventSoccerService {

    EventSoccerRepo eventSoccerRepo;

    @Autowired
    public EventSoccerService(EventSoccerRepo eventSoccerRepo) {
        this.eventSoccerRepo = eventSoccerRepo;
    }

    public EventSoccer findById(Long id) {
        return eventSoccerRepo.findById(id).orElse(null);
    }

    public List<EventSoccer> findAllByDate(String date) {
        return eventSoccerRepo.findAllByDate(date);
    }

    public void saveAllToDb(List<EventSoccer> events) {
        eventSoccerRepo.saveAll(events);
    }

    public void saveToDb(EventSoccer event) {
        eventSoccerRepo.save(event);
    }
}
