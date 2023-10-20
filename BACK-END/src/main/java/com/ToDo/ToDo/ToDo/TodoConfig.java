//package com.ToDo.ToDo.ToDo;
//
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import java.util.List;
//
//@Configuration
//public class TodoConfig {
//
//    @Bean
//    @Autowired
//    CommandLineRunner commandLineRunner(TodoRepository repository) {
//        return args -> {
//            Todos pious = new Todos(
//                    "0248189134",
//                    99,
//                    100,
//                    System.currentTimeMillis()
//                    );
//
//
//            Todos sniper = new Todos(
//                    "0273163806",
//                    47,
//                    7,
//                    System.currentTimeMillis()
//            );
//
//            Todos coldSniper = new Todos(
//                    "0204314933",
//                    7,
//                    777,
//                    System.currentTimeMillis()
//            );
//            Todos PJaySniper = new Todos(
//                    "979797",
//                    97979797,
//                    77799999,
//                    System.currentTimeMillis()
//            );
//            repository.saveAll(List.of(pious, sniper, coldSniper, PJaySniper)); // Save the Todos to the repository
//        };
//    }
//}
